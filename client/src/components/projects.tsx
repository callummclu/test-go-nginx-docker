import { Loader, LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
import "../styles/sass/projects.scss"
import { ProjectItem, ProjectPost } from "./project_item"

export const Projects = () => {

    const [posts, setPosts] = useState<{data: ProjectPost[]}>({data:[]})

    useEffect(()=>{
        getAllPosts().then(async (res:any) => {
            let res_json = await res.json()
            setPosts(res_json) 
        })
    },[])

    return (
        <>
            <h2 style={{textAlign:'center', fontSize:30}}>Projects / Work</h2>
            <p style={{textAlign:'center'}}>A selection of some of the best personal projects ive taken on.</p>
            <div className="projects">
            {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <ProjectItem key={item.id} {...item} />) : <p>No data...</p> : <LoadingOverlay loader={<Loader color="green" />} visible={true} overlayBlur={2} />}
            </div>
        </>
    )
}