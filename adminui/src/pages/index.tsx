import { createPost, getAllPosts } from "@/api/posts";
import { AdminProjectItem } from "@/components/admin_project_item";
import { AdminNav } from "@/components/adminnav";
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
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { loggedIn, user } = useAuth();
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    getAllPosts(1, 3).then(async (res) => {
      let res_json = await res.json();
      setPosts(res_json.data);
    });
  }, []);

  const [newModalOpen, setNewModalOpen] = useState(false);

  const newtitleRef = useRef<HTMLInputElement>(null);
  const newimageRef = useRef<HTMLInputElement>(null);
  const newdescriptionRef = useRef<HTMLInputElement>(null);
  const newbodyRef = useRef<HTMLTextAreaElement>(null);
  const newtechnologyRef = useRef<HTMLInputElement>(null);

  const newPost = (e: any) => {
    e.preventDefault();

    createPost({
      title: newtitleRef.current?.value as string,
      description: newdescriptionRef.current?.value as string,
      body: newbodyRef.current?.value as string,
      image: newimageRef.current?.value as string,
      technologies: (newtechnologyRef.current?.value as string).split(","),
    });
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Modal
            style={{ marginLeft: -32 }}
            opened={newModalOpen}
            onClose={() => setNewModalOpen(false)}
            title="New post!"
          >
            <form onSubmit={newPost}>
              <TextInput required ref={newtitleRef} label="title"></TextInput>
              <TextInput
                required
                ref={newdescriptionRef}
                label="description"
              ></TextInput>
              <TextInput ref={newimageRef} label="image url"></TextInput>
              <Textarea
                required
                ref={newbodyRef}
                mb="xl"
                label="body"
              ></Textarea>
              <Button type="submit">Create new post</Button>
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
