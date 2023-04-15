import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getOrganisationDependencies,
  getSinglePostByTitle,
} from "../../api/posts";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Title,
  Text,
  Card,
  Container,
  Anchor,
  LoadingOverlay,
  Loader,
  Stack,
  Group,
  ActionIcon,
  Avatar,
  Box,
} from "@mantine/core";
import { ProjectItem } from "../../components/project_item";
import { SiGithub } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";

export default function OrganisationView() {
  const router = useRouter();
  const { id } = router.query;
  const [organisation, setOrganisation] = useState<any>();
  const [githubReadme, setGithubReadme] = useState<string>();
  const [posts, setPosts] = useState<any>();

  const formatOrganisationUrl = (url: string) =>
    `https://raw.githubusercontent.com/${url
      .split("/")
      .at(-1)}/.github/main/profile/README.md`;

  useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      getSinglePostByTitle((id as string).replaceAll("-", " ")).then(
        async (post) => {
          const post_json = await post.json();
          setOrganisation(post_json.data);
        }
      );
    }
  }, [id]);

  useEffect(() => {
    if (organisation !== undefined) {
      fetch(formatOrganisationUrl(organisation.github)).then(
        async (response) => {
          if (response.ok) {
            const res_text = await response.text();
            setGithubReadme(res_text);
          }
        }
      );

      getOrganisationDependencies(
        organisation["organisation_dependencies"]
      ).then(async (response) => {
        const res_json = await response.json();
        setPosts(res_json);
      });
    }
  }, [organisation]);
  return (
    <>
      <Stack spacing={0}>
        <Group>
          <Avatar
            alt={organisation?.title}
            size={"xl"}
            src={organisation?.image}
          />
          <Stack spacing={0}>
            <Group>
              <Title>{organisation?.title}</Title>
              <Anchor href={organisation?.github}>
                <ActionIcon aria-label="github">
                  <SiGithub />
                </ActionIcon>
              </Anchor>
              {organisation?.site.length > 0 && (
                <Anchor href={organisation?.site}>
                  <ActionIcon aria-label="site">
                    <CgWebsite />
                  </ActionIcon>
                </Anchor>
              )}
            </Group>
            <Text>{organisation?.description}</Text>
          </Stack>
        </Group>
      </Stack>
      <Box
        mt="xl"
        p={"md"}
        style={{
          background: "#f3f3f3",
          marginLeft: -50,
          width: "calc(100vw - 32px)",
        }}
      >
        <Container mb={50}>
          <Card mb="xl" withBorder>
            <Anchor href={organisation?.github}>
              <Text
                sx={{ position: "absolute", top: 10, right: 10, fontSize: 12 }}
                color="dimmed"
              >
                {organisation?.github.replace("https://", "")}
              </Text>
            </Anchor>
            <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]}>
              {githubReadme as string}
            </ReactMarkdown>
          </Card>

          <Title mt={50} order={2}>
            Projects
          </Title>
          <Text mb={50}>
            The projects within the {organisation?.title} ecosystem
          </Text>
          {posts?.data ? (
            posts.data.length > 0 ? (
              posts?.data?.map((item: any) => (
                <>{<ProjectItem key={item.id} {...item} />}</>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "white" }}>No data :(</p>
            )
          ) : (
            <LoadingOverlay
              loader={<Loader color="green" />}
              visible={true}
              overlayBlur={2}
            />
          )}
        </Container>
      </Box>
    </>
  );
}
