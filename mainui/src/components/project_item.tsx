import { Anchor, Avatar, Badge, Box, Card, Container, Divider, Group, Stack, Text, Title} from "@mantine/core"

import { getTechnologyBadgeContent } from "../helpers/technologyBadges";
import styles from "../styles/sass/projects.module.scss"
export interface ProjectPost{
    title:string;
    description:string;
    image:string;
    id:string|number;
    technologies?:string[];
}

export const ProjectItem = ({title,description,image,id,technologies}:ProjectPost) => {

    return (
        <>
        

                    <div className={styles.card}>

            <Card radius='lg' mb={'xl'} shadow="md" className={styles["project-item"]} >
              <Container px="xs">
                <div className={styles.description}>
                  <Group>
                      <Avatar size="xl" bg="white" alt={title} src={image ? image : ""} radius="xl"/>
                  <Stack spacing={0} mb="md">

                      <Title order={2} style={{margin:0}}>
                        <Anchor sx={{color:"rgb(60,60,60)"}} href={`${window.location.origin}/project/${id}`}>{title}</Anchor>
                      </Title>
                    <Text color='dimmed'>{description}</Text>
                    <Box mt="sm">{technologies && technologies.map((technology)=>getTechnologyBadgeContent(technology)).map((technology)=><Badge key={technology.technology} leftSection={technology.icon} color={technology.color} px="sm" mx={5} variant='light'>{technology.technology}</Badge>)}</Box>

                    </Stack>
                    </Group>
                </div>
                </Container>
            </Card>
            
            </div>
</>

    )
}