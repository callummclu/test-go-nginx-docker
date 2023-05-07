import {
  Container,
  Title,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  Pagination,
  Center,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { createPost, getAllPosts, getEverythingPost } from "@/api/posts";
import { AdminNav } from "@/components/adminnav";
import { AdminProjectItem, ProjectPost } from "@/components/admin_project_item";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [posts, setPosts] = useState<{
    data: ProjectPost[];
    totalPages: number;
    page: number;
  }>({ data: [], totalPages: 1, page: 1 });

  const [page, setPage] = useState(1);

  useEffect(() => {
    getEverythingPost(page).then(async (res: any) => {
      const res_json = await res.json();
      setPosts(res_json);
    });
  }, [page]);

  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <>
          <Container p="xl">
            <AdminNav />
            <Title mt={60}>Posts</Title>
            <div className="projects">
              {posts?.data ? (
                posts.data.length > 0 ? (
                  posts?.data?.map((item) => (
                    <AdminProjectItem key={item.id} {...item} />
                  ))
                ) : (
                  <p>No data...</p>
                )
              ) : (
                "no content loaded..."
              )}
            </div>
          </Container>
          <Center>
            <Pagination
              value={page}
              onChange={setPage}
              total={posts.totalPages}
            />
          </Center>
        </>
      ) : (
        typeof window !== "undefined" &&
        window.location.replace(window.location.origin + "/login")
      )}
    </>
  );
}
