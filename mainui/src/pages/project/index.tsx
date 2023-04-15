import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/posts";
import { ProjectItem, ProjectPost } from "../../components/project_item";
import {
  LoadingOverlay,
  Loader,
  Title,
  Text,
  Container,
  Center,
  Pagination,
  Box,
} from "@mantine/core";
import Head from "next/head";

export default function ProjectPage() {
  const [posts, setPosts] = useState<{
    data: ProjectPost[];
    totalPages: number;
    page: number;
  }>({ data: [], totalPages: 0, page: 0 });

  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllPosts(page).then(async (res: any) => {
      const res_json = await res.json();
      setPosts(res_json);
    });
  }, [page]);

  return (
    <>
      <Head>
        <title>Callum McLuskey - Projects</title>
        <meta
          name="description"
          content="Some projects undertaken throughout my software development life."
        />
      </Head>
      <Title
        order={2}
        mt={40}
        sx={{ textAlign: "center", fontSize: 35, marginBottom: 0 }}
        px={40}
      >
        🧑🏼‍💻 Personal Projects
      </Title>
      <Center>
        <Text px={50} maw={500} size="lg" style={{ textAlign: "center" }}>
          Below are all of the personal projects that I believe show either
          substantial understanding or provide either impressive or interesting
          work.
        </Text>
      </Center>
      <Box
        mt="xl"
        p={"md"}
        style={{
          background: "#f3f3f3",
          marginLeft: -50,
          width: "calc(100vw - 32px)",
        }}
      >
        <Container py={75}>
          {posts?.data ? (
            posts.data.length > 0 ? (
              posts?.data?.map((item) => (
                <>
                  {!item.isorganisation && (
                    <ProjectItem key={item.id} {...item} />
                  )}
                </>
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
        <Center>
          <Pagination
            mb={50}
            total={posts?.totalPages}
            color="teal"
            radius="md"
            onChange={setPage}
          />
        </Center>
      </Box>
    </>
  );
}
