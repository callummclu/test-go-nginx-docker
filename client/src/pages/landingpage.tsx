import '../styles/sass/banner.scss'
import { Text } from '@mantine/core'
import { Loader, LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
import "../styles/sass/projects.scss"
import { ProjectItem, ProjectPost } from "../components/project_item"
import { motion, Variants } from 'framer-motion'

export const LandingPage = () => {

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
            let res_json = await res.json()
            setPosts(res_json) 
        })
    },[])

    return (
        <>
                    <motion.div
      className="card-container-banner"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
                    <motion.div className="card" variants={cardVariants}>
            <div className="banner">


            <div className='text-container'>
                <h1>Hi 👋, I'm <Text
                    variant="gradient"
                    className='name'
                    gradient={{ from: 'darkgreen', to: 'teal', deg: 45 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif',display:'inline' }}
                    >
                    Callum McLuskey
                </Text><br/></h1><h1>A Full stack engineer</h1>
                <p>Gradute software engineer with a variety of professional and personal experience working across the full-stack of software development.</p>
            </div>
            <div className='image' style={{backgroundImage:`url(${window.location.origin+"/logo512.png"})`}}>
            </div>
        </div>
            </motion.div>
            </motion.div>
        <h2 className="about-content-container"  style={{textAlign:'center', fontSize:30, marginBottom:0}}>Personal Projects</h2>
            <p style={{textAlign:'center'}}>A selection of some of the best personal projects ive taken on.</p>
            <div className="projects">

            {posts?.data ? posts.data.length> 0 ? posts?.data?.map((item) => <ProjectItem key={item.id} {...item} />) : <p>No data...</p> : <LoadingOverlay loader={<Loader color="green" />} visible={true} overlayBlur={2} />}

            </div>
        </>
    )
}