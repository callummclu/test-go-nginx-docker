import { Container, Title, Text, Divider } from "@mantine/core"
import { Prism } from "@mantine/prism"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const { user } = useAuth()

    const formatJSON = (str:string) => str?.split('{')?.join('{\n\t')?.split(',')?.join(',\n\t')?.split('}')?.join('\n}')
    return (
        <Container p="xl">
            <Title mt={'xl'}>Callummclu.co.uk</Title>
            <Divider my={'xl'}/>
            <Title mb="sm" order={2}>Welcome, {user?.username} 😊</Title>
            <Text>Welcome to my site, so far this is just a landing page and there is no content, this will change in the future but for now here are you user details </Text>

            <Prism mt="xl" withLineNumbers language="json">{formatJSON(JSON.stringify(user) || "") || ""}</Prism>
        </Container>
    )
}