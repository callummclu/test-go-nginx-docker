
import { ActionIcon, Affix, Button, MantineProvider, Transition } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Nav } from '../components/nav';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/sass/index.scss'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import {GoArrowSmallUp} from 'react-icons/go'
import { useWindowScroll } from '@mantine/hooks';

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
    const [scroll, scrollTo] = useWindowScroll();

    const [awayFromTop, setAwayFromTop] = useState(false);

    useEffect(()=>{
        if(scroll.y > 300){
            setAwayFromTop(true)
        } else {
            setAwayFromTop(false)
        }
    },[scroll])

    return (
        <>
             <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
                aria-label='scroll to top'
                radius='xl'
                variant='filled'
                onClick={() => scrollTo({ y: 0 })}
                style={transitionStyles}
                color={'teal'}
                size="xl"
            >
                <GoArrowSmallUp size={30} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
            <MantineProvider>
                <NotificationsProvider>
                    <AuthProvider>
                        {!isAdmin() && <Nav awayFromTop={awayFromTop}/>}
                        <Container isAdmin={isAdmin()}>
                            <Component {...pageProps}/>
                        </Container>
                    </AuthProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}
