import { Divider, Loader, LoadingOverlay, Text, Title, Group, Stack, Avatar } from "@mantine/core"
import { useEffect, useState } from "react"
import { getSinglePost } from "../../api/posts"
import ReactMarkdown from 'react-markdown'
import { useRouter } from "next/router"

export default function PostPage(){

    const router = useRouter()
    const { id } = router.query;
    

    const [post, setPost] = useState<any>()

    useEffect(()=>{
        getSinglePost(id as string).then(async (res:any) => {
            const res_json = await res.json()
            setPost(res_json) 
        })
    },[id])

    return (
        <>
        <div className="page">
        <LoadingOverlay loader={<Loader color="green" />}  visible={!post} overlayBlur={2} />

                    <Group>
                        <Avatar size={'lg'} src={post?.data?.image}/>
                <Stack spacing={0}>
                    <Title>{post?.data?.title}</Title>
                    <Text mb="md">{post?.data?.description}</Text>
                </Stack>
                    </Group>

            {post && <Divider variant="dashed"/>}
            <Text>

                <ReactMarkdown children={post?.data?.body}/>
            </Text>
        </div>
        </>
    )
}