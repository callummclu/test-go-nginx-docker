import { Container, Title, Text, Divider, Group, Button } from "@mantine/core"
import { Prism } from "@mantine/prism"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const { user, logout } = useAuth()

    const logoutHandler = () => {
        logout()
        window.location.reload()
    }

    const formatJSON = (str:string) => str?.split('{')?.join('{\n\t')?.split(',')?.join(',\n\t')?.split('}')?.join('\n}')
    return (
        <Container p="xl">
            <Group position="apart">
                <Title mt={'xl'}>Callummclu.co.uk</Title>
                <Button color={'red'} onClick={logoutHandler}>Logout</Button>
            </Group>
            <Divider my={'xl'}/>
            <Title mb="sm" order={2}>Welcome, {user?.username} 😊</Title>
            <Text>Welcome to my site, so far this is just a landing page and there is no content, this will change in the future but for now here are you user details </Text>

            <Prism mt="xl" withLineNumbers language="json">{formatJSON(JSON.stringify(user) || "") || ""}</Prism>
        </Container>
    )
}