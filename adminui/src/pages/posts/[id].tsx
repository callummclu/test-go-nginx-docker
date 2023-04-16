import {
  Container,
  Avatar,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  Checkbox,
  MultiSelect,
  SelectItemProps,
  MultiSelectValueProps,
  rem,
  Box,
  CloseButton,
  Flex,
} from "@mantine/core";
import { forwardRef, useEffect, useState } from "react";
import { getDataForDependenciesMultiSelect, getSinglePost } from "@/api/posts";
import { AdminNav } from "@/components/adminnav";
import { AdminProjectItem, ProjectPost } from "@/components/admin_project_item";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { getTechnologyBadgeContent } from "@/helpers/technologyBadges";

export default function Home() {
  function Value({
    value,
    label,
    onRemove,
    classNames,
    ...others
  }: MultiSelectValueProps & { value: string }) {
    return (
      <div {...others}>
        <Box
          sx={(theme) => ({
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          })}
        >
          <Box mr={10}>
            <Avatar size="xs" src={(others as any).image} />
          </Box>
          <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    );
  }

  const Item = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Flex align="center">
          <Box mr={10}>
            <Avatar size="sm" src={(others as any).image} />
          </Box>
          <div>{label}</div>
        </Flex>
      </div>
    )
  );

  function ValueTech({
    value,
    label,
    onRemove,
    classNames,
    ...others
  }: MultiSelectValueProps & { value: string }) {
    let image = getTechnologyBadgeContent(label);
    return (
      <div {...others}>
        <Box
          sx={(theme) => ({
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          })}
        >
          <Box mr={10}>{image.icon}</Box>
          <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    );
  }

  const ItemTech = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => {
      let image = getTechnologyBadgeContent(label as string);

      let Icon = () => image.icon;

      return (
        <div ref={ref} {...others}>
          <Flex align="center">
            <Box mr={10}>
              <Icon />
            </Box>
            <div>{label}</div>
          </Flex>
        </div>
      );
    }
  );

  const [post, setPost] = useState<any>();
  const [technologies, setTechnologies] = useState<string[]>([
    "TypeScript",
    "Go",
    "ExpressJS",
    "React",
    "Postgres",
    "NextJS",
    "NGINX",
    "WebSockets",
    "Docker",
    "NPM",
  ]);
  const router = useRouter();
  const { id } = router.query;

  const [imageHovered, setImageHovered] = useState(false);
  const [multiSelectDependencies, setMultiSelectDependencies] = useState<any>(
    {}
  );

  useEffect(() => {
    if (id !== undefined) {
      getSinglePost(id as string).then(async (res: any) => {
        const res_json = await res.json();
        setPost(res_json.data);
      });

      getDataForDependenciesMultiSelect().then(async (res: any) => {
        const res_json = await res.json();
        setMultiSelectDependencies(res_json.data);
      });
    }
  }, [id]);

  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <>
          <Container p="xl">
            <AdminNav />
            <Group mt={50} mb={20} position="apart">
              <Group>
                <Avatar
                  sx={
                    imageHovered
                      ? {
                          "&::after": {
                            content: '"edit"',
                            position: "absolute",
                            zIndex: 100,
                            color: "white",
                            fontFamily: "helvetica",
                            left: "50%",
                            top: "50%",
                            fontSize: "10px",
                            transform: "translate(-50%,-50%)",
                          },
                          background: "rgb(60,60,60,0.2)",
                          cursor: "pointer",
                        }
                      : {}
                  }
                  src={post?.image}
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                />
                <TextInput defaultValue={post?.title} />
              </Group>
              <Button color="red">Delete</Button>
            </Group>
            <Textarea label="description" defaultValue={post?.description} />
            <TextInput
              mt="sm"
              label="github link"
              defaultValue={post?.github}
            />
            <TextInput mt="sm" label="site link" defaultValue={post?.site} />

            <MultiSelect
              itemComponent={ItemTech}
              valueComponent={ValueTech}
              label="technologies"
              mt="sm"
              data={technologies}
              getCreateLabel={(query) => `+ Create ${query}`}
              creatable
              searchable
              onCreate={(query) => {
                setTechnologies((current: any) => [...current, query]);
                return query;
              }}
              value={post?.technologies}
              onChange={(current) =>
                setPost({ ...post, technologies: current })
              }
            >
              {/* getTechnologyBadgeContent */}
            </MultiSelect>

            <Checkbox
              onChange={(e) =>
                setPost({ ...post, isorganisation: e.target.checked })
              }
              mt="sm"
              label="Is this an organisation"
              defaultChecked={post?.isorganisation}
            />
            {post?.isorganisation && (
              <MultiSelect
                itemComponent={Item}
                valueComponent={Value}
                mt="sm"
                searchable
                data={multiSelectDependencies.map((dep: any) => ({
                  value: `${dep.id}`,
                  label: dep.title,
                  image: dep.image,
                }))}
                value={post.organisation_dependencies}
                onChange={(current) =>
                  setPost({ ...post, organisation_dependencies: current })
                }
              ></MultiSelect>
            )}
            <Checkbox
              onChange={(e) =>
                setPost({ ...post, isspotlight: e.target.checked })
              }
              mt="sm"
              label="Is this in the spotlight"
              defaultChecked={post?.isspotlight}
            />
          </Container>
        </>
      ) : (
        typeof window !== "undefined" &&
        window.location.replace(window.location.origin + "/login")
      )}
    </>
  );
}
