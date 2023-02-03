import { Button, Card, Text, Container, Divider, TextInput, Title, Center, Stack, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';


export default function Login(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { login, loggedIn, loading, error, clearError } = useAuth()

    const submitRequest = () => {
        login({
            username:usernameRef.current!.value,
            password:passwordRef.current!.value
        })
    }

    useEffect(()=>{
      if(!error && loggedIn){
        window.location.replace(window.location.origin+"/admin")
      } else if(error?.length > 0) {
        showNotification({
          color:'red',
          title: 'Error',
          message: error,
        })
        clearError()

      }
    },[error,loggedIn])

    return (
        <>
        {loggedIn ? <></> :
        <Container h="100vh" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Card shadow={'sm'} p="xl" w={350} withBorder pos={'relative'}>
          <LoadingOverlay visible={loading} overlayBlur={2} />
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
            <Text ta="center" color={'gray'}>
              Signups are closed as this area is used to edit site content.
            </Text>
            </Center>
          </Card>
        </Container>
      }</>
      );
}