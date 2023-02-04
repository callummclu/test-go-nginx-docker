import styles from '../styles/sass/banner.module.scss'

import { Avatar, Card, Container, Space, Text, Title } from '@mantine/core'
import { Loader, LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
import "../styles/sass/projects.module.scss"
import { ProjectItem, ProjectPost } from "../components/project_item"
import { motion, Variants } from 'framer-motion'
import Head from 'next/head'

export default function LandingPage(){

    const cardVariants: Variants = {
        onscreen: {
          y: 50,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.8
          }
        }
      };

    const [posts, setPosts] = useState<{data: ProjectPost[]}>({data:[]})

    useEffect(()=>{
        getAllPosts().then(async (res:any) => {
                const res_json = await res.json()
                setPosts(res_json) 
            
        })
    },[])

    return (
        <>
        <Head>
            <title>Callum McLuskey</title>
            <meta name="description" content="Hi i'm Callum McLuskey a 4th year student at Glasgow University and avid Full stack software engineer working at guitarguitar." />
        </Head>
                    <motion.div
      className={styles['card-container-banner']}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
                    <motion.div className={styles.card} variants={cardVariants}>
            <div className={styles.banner}>


            <div className={styles['text-container']}>
                <h1>Hi 👋, I'm <Text
                    variant="gradient"
                    gradient={{ from: 'darkgreen', to: 'teal', deg: 45 }}
                    sx={{display:'inline' }}
                    >
                    Callum McLuskey
                </Text><br/></h1><h1>A Full stack engineer</h1>
                <Space h="md"></Space>
                <Text size="lg" color='dimmed'>Gradute software engineer with a variety of professional and personal experience working across the full-stack of software development.</Text>
            </div>
            <Avatar radius={200} size={300} src={'https://static.callummclu.co.uk/main/me.webp' ?? ''}>

            </Avatar>
        </div>
            </motion.div>
            </motion.div>

            <div style={{ width:'100vw', marginLeft:-50, height:'auto',paddingBottom:10,marginTop:-100}} >
            <div className={styles.wave}></div>
            <div style={{background:'#009473', paddingTop:100}}>
            <Title className="dark-text" order={2} sx={{textAlign:'center', fontSize:40, marginBottom:0}}>Personal Projects</Title>
            <Text px={50} size='lg' className='dark-text' style={{textAlign:'center'}}>A selection of some of the best personal projects ive taken on.</Text>
            <div className={styles.projects}>
            <Container py={75}>
            {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <ProjectItem key={item.id} {...item} />) : <p>No data...</p> : <LoadingOverlay loader={<Loader color="green" />} visible={true} overlayBlur={2} />}

            </Container>
            </div>
            </div>
        </div>
        </>
    )
}