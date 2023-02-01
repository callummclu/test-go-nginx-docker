import { Divider, Loader, LoadingOverlay, Text, Title, Image, Group, Stack, Avatar } from "@mantine/core"
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

                    <Group>
                        <Avatar size={'lg'} src={post?.data.image}/>
                <Stack spacing={0}>
                    <Title>{post?.data.title}</Title>
                    <Text mb="md">{post?.data.description}</Text>
                </Stack>
                    </Group>

            {post && <Divider variant="dashed"/>}
            <Text>

                <ReactMarkdown children={post?.data.body}/>
            </Text>
        </div>
        </>
    )
}