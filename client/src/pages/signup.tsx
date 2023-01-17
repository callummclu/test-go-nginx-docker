import { Anchor, Button, Card, Text, Container, Divider, TextInput, Title, Center, Stack, Group, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';


export const Signup = () => {
    let firstnameRef = useRef<HTMLInputElement>(null)
    let surnameRef = useRef<HTMLInputElement>(null)
    let usernameRef = useRef<HTMLInputElement>(null)
    let emailRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)
    let confirmRef = useRef<HTMLInputElement>(null)
    const [errorInput,setErrorInput] = useState(false)
    const { signUp, loggedIn, logout, loading, error, clearError } = useAuth()

    const submitRequest = () => {


        if(passwordRef.current!.value === confirmRef.current!.value){
            setErrorInput(false)
            signUp({
                name: firstnameRef.current!.value,
                surname: surnameRef.current!.value,
                username: usernameRef.current!.value,
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            })
        } else {
            setErrorInput(true)
        }
    }

    const signOutHandler = () => {
        logout()
        window.location.reload()
    }

    useEffect(()=>{
      if(!error && loggedIn){
        window.location.replace(window.location.origin)
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
        <Container h="100vh" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Card shadow={'sm'} p="xl" w={350} withBorder pos="relative">
          <LoadingOverlay visible={loading} overlayBlur={2} />

          {loggedIn ?
            <Center>
                <Button onClick={signOutHandler} color={'red'}>Sign out</Button>
            </Center>
            :
            <>
              <Stack m={"md"} mb="xl" spacing={0}>
              <Center>
              <Title>
                Sign up
              </Title>
              </Center>
              <Center>
              <Text ta={'center'} color={'gray'}>
                Join Us by entering your details below
              </Text>
              </Center>
              </Stack>
              <Group mb="sm" grow>
                <TextInput ref={firstnameRef} placeholder='firstname'/>
                <TextInput ref={surnameRef} placeholder='surname'/>
              </Group>
              <TextInput ref={usernameRef} mb="sm" placeholder="username"/>
              <TextInput ref={emailRef} mb="sm" placeholder="email"/>
            <TextInput ref={passwordRef} mt="sm" mb="sm" type={'password'} placeholder='password'/>
            <TextInput error={errorInput} ref={confirmRef} mt="sm" mb="sm" type={'password'} placeholder='confirm password'/>
            <br/>
            <Button onClick={submitRequest} mt="sm" fullWidth>Signup</Button>
            <br/>
            <Divider m="lg"/>
            <Center>
            <Text color={'gray'}>
              Already have an account? <Anchor href='login'>login</Anchor>
            </Text>
            </Center>
            </>
}
          </Card>
        </Container>
      );
}