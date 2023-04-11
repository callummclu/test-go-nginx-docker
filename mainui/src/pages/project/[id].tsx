import { Divider, Loader, LoadingOverlay, Text, Title, Group, Stack, Avatar, Box, Badge, Container, ActionIcon, Anchor } from "@mantine/core"
import { useEffect, useState } from "react"
import { getSinglePost } from "../../api/posts"
import ReactMarkdown from 'react-markdown'
import { useRouter } from "next/router"
import Head from "next/head"
import { getTechnologyBadgeContent } from "../../helpers/technologyBadges"
import { SiGithub } from "react-icons/si"
import {CgWebsite} from 'react-icons/cg'
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'


export default function PostPage(){

    const router = useRouter()
    const { id } = router.query;


    const [post, setPost] = useState<any>()
    const [githubReadme, setGithubReadme] = useState<string>();

    const formatGithub = (url:string) => {
        return url?.replace('https://github.com', "https://raw.githubusercontent.com")
    }

    useEffect(()=>{
        if(id !== undefined){

            getSinglePost(id as string).then(async (res:any) => {
                const res_json = await res.json()
                setPost(res_json) 
                console.log(res_json)
                return res_json
            }) 
        }

    },[id])

    useEffect(()=>{
        if (post != null){
            fetch(`${formatGithub(post?.data?.github)}/main/README.md`).then(async (res:any) => {
                const res_text = await res.text()
                setGithubReadme(res_text);
            }).catch(error => setGithubReadme(error.message.toString()))
        }
    },[post])

    return (
        <>
        <Head>
            <title>Callum McLuskey - {post?.data?.title}</title>
            <meta name="description" content="Hi i'm Callum McLuskey a 4th year student at Glasgow University and avid Full stack software engineer working at guitarguitar." />
        </Head>
        <div className="page">
        <LoadingOverlay loader={<Loader color="green" />}  visible={!post} overlayBlur={2} />
                
                    <Group>

                        <Avatar alt={post?.data?.title} size={'xl'} src={post?.data?.image}/>
                <Stack spacing={0}>
                    <Group>
                    <Title>{post?.data?.title}</Title>
                    <Anchor href={post?.data?.github}>
                    <ActionIcon aria-label="github">
                        <SiGithub/>
                    </ActionIcon>
                    </Anchor>
                    {post?.data?.site.length > 0 &&
                        <Anchor href={post?.data?.site}>
                        <ActionIcon aria-label="site">
                            <CgWebsite/>
                        </ActionIcon>
                        </Anchor>
                    }
                    </Group>
                    <Text>{post?.data?.description}</Text>
                    <Box mt="xs">{post?.data?.technologies && post?.data?.technologies.map((technology:string)=>getTechnologyBadgeContent(technology)).map((technology:any)=><Badge key={technology.technology} leftSection={technology.icon} color={technology.color} px="sm" mx={5} variant='light'>{technology.technology}</Badge>)}</Box>
                </Stack>
                    </Group>

            <Box mt="xl" p={'md'} style={{background:'#f3f3f3', marginLeft:-50, width:"calc(100vw - 32px)"}}>
            <Text>
                <Container>
                {githubReadme ? <ReactMarkdown rehypePlugins={[rehypeRaw,remarkGfm]} children={githubReadme as any}/> : <LoadingOverlay visible={true} overlayBlur={2} loader={<Loader color="green"/>}/>}
                </Container>
            </Text>
            </Box>
        </div>
        </>
    )
}