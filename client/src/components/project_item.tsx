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

            <Card bg={'transparent'} className={styles["project-item"]} >
                <div className={styles.description}>
                    <Group style={{marginBottom:0}}>
                      <Avatar alt={title} src={image ? image : ""} radius="xl"/>
                      <h2 style={{margin:0}}>
                        <Anchor className="dark-text" href={`${window.location.origin}/p/${id}`}>{title}</Anchor>
                      </h2>
                    </Group>
                    <p className="dark-text">{description}</p>
                    
                    <Text>
                    </Text>
                </div>
                <div>{technologies && technologies.map((technology)=>getTechnologyBadgeContent(technology)).map((technology)=><Badge leftSection={technology.icon} color={technology.color} px="sm" mx={5} mb={6} variant='filled'>{technology.technology}</Badge>)}</div>
            </Card>
            
            </motion.div>

            

        </motion.div>


</>

    )
}