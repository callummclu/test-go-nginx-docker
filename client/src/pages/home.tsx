import { Container, Title, Button, Text, LoadingOverlay, Loader, Group, Modal, TextInput, Textarea } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { createPost, getAllPosts } from "../api/posts"
import { AdminNav } from "../components/adminnav"
import { AdminProjectItem } from "../components/admin_project_item"
import { ProjectItem, ProjectPost } from "../components/project_item"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const { user, logout } = useAuth()

    const [posts, setPosts] = useState<{data: ProjectPost[]}>({data:[]})

    useEffect(()=>{
        getAllPosts().then(async (res:any) => {
            let res_json = await res.json()
            console.log(res_json)
            setPosts(res_json) 
        })
    },[])

    const [modalOpen, setModalOpen] = useState(false)

    const titleRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const newPost = (e:any) => {
        e.preventDefault();

        console.log(e.target)


        createPost({
            title:titleRef.current?.value as string,
            description:descriptionRef.current?.value as string,
            body:bodyRef.current?.value as string,
            image:imageRef.current?.value as string
        })
    }

    return (
        <>
        <Modal
        style={{top:50}}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New post!"
      >
        <form onSubmit={newPost}>
            <TextInput required ref={titleRef} label="title"></TextInput>
            <TextInput required ref={descriptionRef} label="description"></TextInput>
            <TextInput ref={imageRef} label="image url"></TextInput>
            <Textarea required ref={bodyRef} mb="xl" label="body"></Textarea>
            <Button type="submit">Create new post</Button>
        </form>
      </Modal>
        <Container p="xl">
            <AdminNav/>
            <Group mt={60} position="apart">
            <Title>Posts</Title>
            <Button onClick={() => setModalOpen(true)}>New Post</Button>
            </Group>
            <div className="projects">
                {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <AdminProjectItem key={item.id} {...item} />) : <p>No data...</p> : "no content loaded..."}
            </div>

            

        </Container>
        </>
    )
}