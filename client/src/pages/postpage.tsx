import { Divider, Loader, LoadingOverlay, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePost } from "../api/posts"
import ReactMarkdown from 'react-markdown'

export const PostPage = () => {

    const { id } = useParams()

    const [post, setPost] = useState<any>()

    useEffect(()=>{
        getSinglePost(id as string).then(async (res:any) => {
            let res_json = await res.json()
            setPost(res_json) 
        })
    },[id])

    return (
        <>
        <div className="page">
        <LoadingOverlay loader={<Loader color="green" />}  visible={!post} overlayBlur={2} />
            <div className="image-container">
            <div className="image" style={{backgroundImage:`url(${post?.data.image})`}}></div>
            <div className="image-overlay"></div>
                <div className="content">
                <Title>{post?.data.title}</Title>
                <Text mb="md">{post?.data.description}</Text>
                </div>
            </div>
            {post && <Divider variant="dashed"/>}
            <Text>
                <ReactMarkdown children={post?.data.body}/>
            </Text>
        </div>
        </>
    )
}