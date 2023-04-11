import { Divider, Loader, LoadingOverlay, Text, Title, Group, Stack, Avatar, Box, Badge, Container, ActionIcon, Anchor } from "@mantine/core"
import { useEffect, useState } from "react"
import { getSinglePost, getSinglePostByTitle } from "../../api/posts"
import ReactMarkdown from 'react-markdown'
import { useRouter } from "next/router"
import Head from "next/head"
import { getTechnologyBadgeContent } from "../../helpers/technologyBadges"
import { SiGithub } from "react-icons/si"
import {CgWebsite} from 'react-icons/cg'
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'
import { BiStar } from "react-icons/bi"


export default function PostPage(){

    const router = useRouter()
    const { id } = router.query;


    const [post, setPost] = useState<any>()
    const [githubReadme, setGithubReadme] = useState<string>();
    const [githubStats,setGithubStats] = useState<any>();
    const [error, setError] = useState(false)

    const formatGithubReadme = (url:string) => {
        return url?.replace('https://github.com', "https://raw.githubusercontent.com")
    }

    const formatGithubStats = (url:string) => {
        return url?.replace('https://github.com', "https://api.github.com/repos")
    }

    useEffect(()=>{
        if(id !== undefined){

            getSinglePostByTitle((id as string).replace("-"," ")).then(async (res:any) => {

                if(res.ok){
                    const res_json = await res.json()
                    setPost(res_json) 

                } else {
                    setError(true)
                }

            }) 
        }

    },[id])

    useEffect(()=>{
        if (post != null){
            fetch(`${formatGithubReadme(post?.data?.github)}/main/README.md`).then(async (res:any) => {
                const res_text = await res.text()
                setGithubReadme(res_text);
            }).catch(error => setGithubReadme(error.message.toString()))

            fetch(`${formatGithubStats(post?.data?.github)}`).then(async (res:any) => {
                const res_json = await res.json()
                setGithubStats(res_json);
            })
        }
    },[post])

    return (
        <>
        {error ? 
            <p>error</p>
        :
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
            {/* <Box py="xs"  style={{marginLeft:-50, width:"calc(100vw)", background:'white',display:'flex',justifyContent:'center'}}>
                <Text pt="xs" style={{color:'gray',display:"flex", justifyContent:"center", alignItems:"center", gap:5,width:"80%"}}><BiStar/> <b>{githubStats ? githubStats.stargazers_count : "?"}</b> stars</Text>
            </Box> */}
            <Box mt="xl" p={'md'} style={{background:'#f3f3f3', marginLeft:-50, width:"calc(100vw - 32px)"}}>
            <Text>
                
                <Container>
                {githubReadme ? <ReactMarkdown rehypePlugins={[rehypeRaw,remarkGfm]} children={githubReadme as any}/> : <LoadingOverlay visible={true} overlayBlur={2} loader={<Loader color="green"/>}/>}
                </Container>
            </Text>
            </Box>
        </div>
        </>
}
        </>

    )
}