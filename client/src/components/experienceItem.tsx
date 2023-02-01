import { Card, Title, Text, Group, Stack, Image } from "@mantine/core"
import { motion, Variants } from "framer-motion";
export interface ExperienceProps{
    company:string;
    title:string;
    period:string;
    description:any;
    current:boolean;
    image?:string;
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

export const ExperienceItem = ({company,title, period, description,current,image}:ExperienceProps) => {
    return (
    
        <Card withBorder bg={current ? "rgba(0,0,0,0.025)" : "white"} w={'100%'}>
            <Group mb="sm">
                    <Image src={image || undefined} width={50} maw={50} height={50} radius="sm" withPlaceholder></Image>
            <Stack spacing={0}>
            <Group spacing={5} w={"100%"}>
                <Title lh={0.5} order={3}>{company}</Title><Title order={3}><Text sx={{fontWeight:200}}>{title}</Text></Title>
            </Group>
            <Text fw={400} c={'rgb(60,60,60)'}>{period}</Text>
            </Stack>
            </Group>
            <Text c={'rgb(60,60,60)'}>
                {description}
            </Text>

        </Card>
    )
}