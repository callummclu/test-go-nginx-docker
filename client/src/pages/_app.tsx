
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect } from 'react';
import { Container } from '../components/Container';
import { Nav } from '../components/nav';
import useAuth, { AuthProvider } from '../hooks/useAuth';
import '../styles/sass/index.scss'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

export default function MyApp({Component, pageProps}:any){
    const isAdmin = () => {
        if (typeof window !== 'undefined') {
          return  window.location.href.includes('/admin')
        } 
    }

    useEffect(()=>{
        if('serviceWorker' in navigator){
            if(typeof window !== 'undefined'){
                window.addEventListener('load', function(){
                    serviceWorkerRegistration.register();
                })
            }
        }
    },[])

    return (
        <>
            <MantineProvider>
                <NotificationsProvider>
                    <AuthProvider>
                        {!isAdmin() && <Nav/>}
                        <Container isAdmin={isAdmin()}>
                            <Component {...pageProps}/>
                        </Container>
                    </AuthProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}