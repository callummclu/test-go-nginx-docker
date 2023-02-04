
import { Affix, Button, MantineProvider, Transition } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Nav } from '../components/nav';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/sass/index.scss'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import {AiOutlineArrowUp} from 'react-icons/ai'
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
            <Button
              color={'green'}
              leftIcon={<AiOutlineArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              
            </Button>
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
