import { Anchor, Button, Card, Text, Container, Divider, TextInput, Title, Center, Stack } from '@mantine/core';
import { useRef } from 'react';
import useAuth from '../hooks/useAuth';


export const Login = () => {
    let usernameRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)

    const { login, loggedIn,logout } = useAuth()

    const submitRequest = () => {
        login({
            username:usernameRef.current!.value,
            password:passwordRef.current!.value
        },()=>{
            window.location.href !== window.location.origin && window.location.replace(window.location.origin)
        })
    }

    const signOutHandler = () => {
        logout()
        window.location.reload()
    }

    return (
        <>
        
        <Container h="100vh" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Card shadow={'sm'} p="xl" w={350} withBorder>
          {loggedIn ?
            <Center>
                <Button onClick={signOutHandler} color={'red'}>Sign out</Button>
            </Center>
            :
            <>
              <Stack m={"md"} mb="xl" spacing={0}>
              <Center>
              <Title>
                Login
              </Title>
              </Center>
              <Center>
              <Text color={'gray'}>
                Log into your account
              </Text>
              </Center>
              </Stack>
            <TextInput ref={usernameRef} mb="sm" placeholder="username"/>
            <TextInput ref={passwordRef} mt="sm" mb="sm" type={'password'} placeholder='password'/>
            <Button onClick={submitRequest} mt="sm" fullWidth>Login</Button>
            <br/>
            <Divider m="lg"/>
            <Center>
            <Text color={'gray'}>
              Not a member yet? <Anchor href='signup'>Signup</Anchor>
            </Text>
            </Center>
            </>
            }
          </Card>
        </Container>
        </>
      );
}