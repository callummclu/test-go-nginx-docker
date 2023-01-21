import { Container, Title, Button, Stack, LoadingOverlay, Loader, Group } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
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


    return (
        <Container p="xl">
            <AdminNav/>
            <Group mt={60} position="apart">
            <Title>Posts</Title>
            <Button>New Post</Button>
            </Group>
            <div className="projects">
                {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <AdminProjectItem key={item.id} {...item} />) : <p>No data...</p> : <LoadingOverlay loader={<Loader color="green" />} visible={true} overlayBlur={2} />}
            </div>

        </Container>
    )
}