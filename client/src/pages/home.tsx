import { Container, Title, Text, Divider, Group, Button, Skeleton } from "@mantine/core"
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
            <Group position="apart" align={'center'}>
                <Button color={'red'} onClick={logoutHandler}>Logout</Button>
            </Group>
            <Divider variant="dashed" my={'xl'}/>
            <Skeleton visible={!user} mb="sm"><Title mb="sm" order={2}>Welcome, {user?.username} 😊</Title></Skeleton>
            <Skeleton visible={!user} mb="sm"><Text>Welcome to my site, so far this is just a landing page and there is no content, this will change in the future but for now here are you user details </Text></Skeleton>

            <Skeleton visible={!user}><Prism mt="xl" withLineNumbers language="json">{formatJSON(JSON.stringify(user) || "") || ""}</Prism></Skeleton>
        </Container>
    )
}