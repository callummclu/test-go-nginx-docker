import { Anchor, Avatar, Badge, Card, Divider, Group, Text} from "@mantine/core"
import { motion, Variants } from "framer-motion";
import { getTechnologyBadgeContent } from "../helpers/technologyBadges";
import styles from "../styles/sass/projects.module.scss"
export interface ProjectPost{
    title:string;
    description:string;
    image:string;
    id:string|number;
    technologies?:string[];
}

const cardVariants: Variants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

export const ProjectItem = ({title,description,image,id,technologies}:ProjectPost) => {

    return (
        <>
        <motion.div
      className={styles["card-container"]}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >

                    <motion.div className={styles.card} variants={cardVariants}>

            <Card className={styles["project-item"]}>
                <div className={styles.description}>
                    <Group>
                        <Avatar alt={title} src={image ? image : ""}/>
                    <h2>{title}</h2>
                    </Group>
                    <p>{description}</p>
                    
                    {technologies && technologies.map((technology)=>getTechnologyBadgeContent(technology)).map((technology)=><Badge leftSection={technology.icon} color={technology.color} px="sm" mx={5} mb={6}>{technology.technology}</Badge>)}
                    <Text>
                      <Anchor style={{color:"darkgreen",textDecoration:'none'}} href={`${window.location.origin}/p/${id}`}>
                        visit here
                      </Anchor>
                    </Text>
                </div>
            </Card>
            
            </motion.div>

            

        </motion.div>

<Divider/>
</>

    )
}