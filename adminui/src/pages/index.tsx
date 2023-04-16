import {
  createPost,
  getAllPosts,
  getDataForDependenciesMultiSelect,
} from "@/api/posts";
import { AdminProjectItem } from "@/components/admin_project_item";
import { AdminNav } from "@/components/adminnav";
import { getTechnologyBadgeContent } from "@/helpers/technologyBadges";
import useAuth from "@/hooks/useAuth";
import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Button,
  Anchor,
  Center,
  Loader,
  TextInput,
  Textarea,
  Modal,
  SelectItemProps,
  Flex,
  CloseButton,
  rem,
  MultiSelectValueProps,
  Avatar,
  MultiSelect,
  Checkbox,
} from "@mantine/core";
import { forwardRef, useEffect, useRef, useState } from "react";

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
  const { loggedIn, user } = useAuth();
  const [posts, setPosts] = useState<any>();
  const [multiSelectDependencies, setMultiSelectDependencies] = useState<any>(
    {}
  );
  useEffect(() => {
    getAllPosts(1, 3).then(async (res) => {
      let res_json = await res.json();
      setPosts(res_json.data);
    });

    getDataForDependenciesMultiSelect().then(async (res: any) => {
      const res_json = await res.json();
      setMultiSelectDependencies(res_json.data);
    });
  }, []);

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [isorganisationpost, setIsorganisationPost] = useState(false);

  const newtitleRef = useRef<HTMLInputElement>(null);
  const newimageRef = useRef<HTMLInputElement>(null);
  const newdescriptionRef = useRef<HTMLTextAreaElement>(null);
  const newgithubRef = useRef<HTMLInputElement>(null);
  const newIsSpotlightRef = useRef<HTMLInputElement>(null);
  const sitelinkRef = useRef<HTMLInputElement>(null);
  const [technologiesList, setTechnologiesList] = useState<any>([]);
  const newPost = (e: any) => {
    e.preventDefault();

    createPost({
      title: newtitleRef.current?.value as string,
      description: newdescriptionRef.current?.value as string,
      image: newimageRef.current?.value as string,
      technologies: technologiesList,
      site: sitelinkRef.current?.value as string,
      isspotlight: newIsSpotlightRef.current?.checked as boolean,
      github: newgithubRef.current?.value as string,
      organisation_dependencies: multiSelectDependencies,
      isorganisation: isorganisationpost,
    });
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Modal
            centered
            style={{ fontFamily: "helvetica", marginLeft: -32 }}
            opened={newModalOpen}
            onClose={() => setNewModalOpen(false)}
            title="New post!"
          >
            <form onSubmit={newPost}>
              <TextInput label="title" ref={newtitleRef} />
              <Textarea label="description" ref={newdescriptionRef} />
              <TextInput mt="sm" label="github link" ref={newgithubRef} />
              <TextInput mt="sm" label="site link" ref={sitelinkRef} />

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
                value={technologiesList}
                onChange={(current) => {
                  setTechnologiesList(current);
                }}
              ></MultiSelect>

              <Checkbox
                onChange={(e) => setIsorganisationPost(e.target.checked)}
                mt="sm"
                label="Is this an organisation"
                defaultChecked={isorganisationpost}
              />
              {isorganisationpost && (
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
                ></MultiSelect>
              )}
              <Checkbox
                ref={newIsSpotlightRef}
                mt="sm"
                label="Is this in the spotlight"
                defaultChecked={posts?.isspotlight}
              />
              <Button mt="xl" type="submit">
                Create new post
              </Button>
            </form>
          </Modal>
          <Container p="xl">
            <AdminNav />
            <Box m="md" mt={40} className="index-grid">
              <div className="new">
                <Title order={2}>👋 Welcome back, {user?.name} </Title>
                <Text style={{ fontSize: 15 }} color="dimmed">
                  Are you ready to add a new post?, press below to get started
                  <Box p="xl">
                    <Button onClick={() => setNewModalOpen(true)} fullWidth>
                      New Post
                    </Button>
                  </Box>
                </Text>
              </div>
              <div className="analytics">
                <Title order={3}>✍️ Edit existing posts</Title>
                <Text style={{ fontSize: 15 }} color="dimmed">
                  Are you wanting to edit the site content, have a look at some
                  of the recent posts below or press view more to edit all
                  posts.
                </Text>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {posts ? (
                    posts.map((post: any) => <AdminProjectItem {...post} />)
                  ) : (
                    <Box mt={40} w="100%">
                      <Center>
                        <Loader />
                      </Center>
                    </Box>
                  )}
                </div>

                <Center mt="xl">
                  <Anchor href={`${window.location.origin}/posts`}>
                    <Button variant="subtle">View all posts</Button>
                  </Anchor>
                </Center>
              </div>
              <div className="existing">
                <Title order={3}>🕵️ Analytics</Title>
                <Text style={{ fontSize: 15 }} color="dimmed">
                  Have a quick glance at how the site is doing, below is how
                  many views the site has had over the past month
                </Text>
              </div>
            </Box>
          </Container>
        </>
      ) : (
        typeof window !== "undefined" &&
        window.location.replace(window.location.origin + "/login")
      )}
    </>
  );
}
