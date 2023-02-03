import styles from '../styles/sass/banner.module.scss'

import { Container, Text } from '@mantine/core'
import { Loader, LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
import "../styles/sass/projects.module.scss"
import { ProjectItem, ProjectPost } from "../components/project_item"
import { motion, Variants } from 'framer-motion'

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
                    className={styles.name}
                    gradient={{ from: 'darkgreen', to: 'teal', deg: 45 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif',display:'inline' }}
                    >
                    Callum McLuskey
                </Text><br/></h1><h1>A Full stack engineer</h1>
                <p>Gradute software engineer with a variety of professional and personal experience working across the full-stack of software development.</p>
            </div>
            <div className={styles.image} style={{backgroundImage:`url(https://static.callummclu.co.uk/main/me.webp)`}}>
            </div>
        </div>
            </motion.div>
            </motion.div>
        <h2 className={styles["about-content-container"]}  style={{textAlign:'center', fontSize:30, marginBottom:0}}>😄 Personal Projects</h2>
            <p style={{textAlign:'center'}}>A selection of some of the best personal projects ive taken on.</p>
            
            <div className={styles.projects}>
            <Container mb={100}>
            {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <ProjectItem key={item.id} {...item} />) : <p>No data...</p> : <LoadingOverlay loader={<Loader color="green" />} visible={true} overlayBlur={2} />}
            </Container>
            </div>
        </>
    )
}