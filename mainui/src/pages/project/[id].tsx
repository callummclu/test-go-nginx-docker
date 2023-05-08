import {
  Loader,
  LoadingOverlay,
  Text,
  Title,
  Group,
  Stack,
  Avatar,
  Box,
  Badge,
  Container,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { getSinglePostByTitle } from "../../api/posts";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Head from "next/head";
import { getTechnologyBadgeContent } from "../../helpers/technologyBadges";
import { SiGithub } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Error from "../_error";
import { Post, ReturnData } from "../../types/post";
import { Technology } from "../../types/technology";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<ReturnData<Post>>();
  const [githubReadme, setGithubReadme] = useState<string>();
  const [error, setError] = useState(false);

  const formatGithubReadme = (url: string) => {
    return url?.replace(
      "https://github.com",
      "https://raw.githubusercontent.com"
    );
  };

  useEffect(() => {
    if (id !== undefined) {
      getSinglePostByTitle((id as string).replaceAll("-", " ")).then(
        async (res) => {
          if (res.ok) {
            const res_json = await res.json();
            setPost(res_json);
          } else {
            setError(true);
          }
        }
      );
    }
  }, [id]);

  useEffect(() => {
    if (post != null) {
      fetch(
        `${formatGithubReadme(post?.data?.github as string)}/main/README.md`
      )
        .then(async (res) => {
          const res_text = await res.text();
          setGithubReadme(res_text);
        })
        .catch((error) => setGithubReadme(error.message.toString()));
    }
  }, [post]);

  return (
    <>
      {error ? (
        <Error code={404} message={"This project does not exist"} />
      ) : (
        <>
          <Head>
            <title>Callum McLuskey - {post?.data?.title}</title>
            <meta
              name="description"
              content="Hi i'm Callum McLuskey a 4th year student at Glasgow University and avid Full stack software engineer working at guitarguitar."
            />
          </Head>
          <div className="page">
            <LoadingOverlay
              loader={<Loader color="green" />}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              visible={!post}
              overlayBlur={2}
            />

            <Group>
              <Avatar
                style={{ animation: "fadeMe 0.3s" }}
                alt={post?.data?.title}
                size={"xl"}
                src={post?.data?.image}
              />
              <Stack spacing={0}>
                <Group>
                  <Title>{post?.data?.title}</Title>
                  <Anchor
                    href={post?.data?.github}
                    style={{ animation: "fadeMe 0.3s" }}
                  >
                    <ActionIcon aria-label="github">
                      <SiGithub />
                    </ActionIcon>
                  </Anchor>
                  {(post?.data?.site as string).length > 0 && (
                    <Anchor
                      href={post?.data?.site}
                      style={{ animation: "fadeMe 0.3s" }}
                    >
                      <ActionIcon aria-label="site">
                        <CgWebsite />
                      </ActionIcon>
                    </Anchor>
                  )}
                </Group>
                <Text>{post?.data?.description}</Text>
                <Box mt="xs">
                  {post?.data?.technologies &&
                    post?.data?.technologies
                      .map((technology: string) =>
                        getTechnologyBadgeContent(technology)
                      )
                      .map((technology: Technology) => (
                        <Badge
                          key={technology.technology}
                          leftSection={technology.icon}
                          color={technology.color}
                          px="sm"
                          mx={5}
                          variant="light"
                        >
                          {technology.technology}
                        </Badge>
                      ))}
                </Box>
              </Stack>
            </Group>
            <Box
              mt="xl"
              p={"md"}
              style={{
                background: "#f3f3f3",
                marginLeft: -50,
                width: "100vw",
                animation: "fadeMe 0.3s",
              }}
            >
              <Text>
                <Container>
                  {githubReadme ? (
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, remarkGfm]}
                      children={githubReadme as string}
                    />
                  ) : (
                    <LoadingOverlay
                      style={{ animation: "fadeMe 0.3s" }}
                      visible={true}
                      overlayBlur={2}
                      loader={<Loader color="green" />}
                    />
                  )}
                </Container>
              </Text>
            </Box>
          </div>
        </>
      )}
    </>
  );
}
