import { Container, Title, Button, Group, Modal, TextInput, Textarea } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { createPost, getAllPosts } from "../../api/posts"
import { AdminNav } from "../../components/adminnav"
import { AdminProjectItem } from "../../components/admin_project_item"
import { ProjectPost } from "../../components/project_item"
import useAuth from "../../hooks/useAuth"

export default function Home() {

    const [posts, setPosts] = useState<{data: ProjectPost[]}>({data:[]})

    useEffect(()=>{
        getAllPosts().then(async (res:any) => {
            const res_json = await res.json()
            setPosts(res_json) 
        })
    },[])

    const { loggedIn } = useAuth();


    const [modalOpen, setModalOpen] = useState(false)

    const titleRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)
    const technologyRef = useRef<HTMLInputElement>(null);

    const newPost = (e:any) => {
        e.preventDefault();


        createPost({
            title:titleRef.current?.value as string,
            description:descriptionRef.current?.value as string,
            body:bodyRef.current?.value as string,
            image:imageRef.current?.value as string,
            technologies: (technologyRef.current?.value as string).split(','),
        })
    }

    return (
        <>{loggedIn ? <>
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
        </> : typeof window !== "undefined" && window.location.replace(window.location.origin+'/admin/login')}</>
    )
}