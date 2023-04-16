import {
  Container,
  Title,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { createPost, getAllPosts } from "@/api/posts";
import { AdminNav } from "@/components/adminnav";
import { AdminProjectItem, ProjectPost } from "@/components/admin_project_item";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [posts, setPosts] = useState<{ data: ProjectPost[] }>({ data: [] });

  useEffect(() => {
    getAllPosts().then(async (res: any) => {
      const res_json = await res.json();
      setPosts(res_json);
    });
  }, []);

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
        </>
      ) : (
        typeof window !== "undefined" &&
        window.location.replace(window.location.origin + "/login")
      )}
    </>
  );
}
