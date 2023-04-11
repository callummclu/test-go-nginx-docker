
import { ActionIcon, Affix, Anchor, MantineProvider, Transition } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Nav } from '../components/nav';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/sass/index.scss'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import {GoArrowSmallUp} from 'react-icons/go'
import { useViewportSize } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { CgClose, CgMenu } from 'react-icons/cg';
import {GiHamburgerMenu} from 'react-icons/gi'
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export default function MyApp({Component, pageProps}:any){
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const isAdmin = () => {
        if (typeof window !== 'undefined') {
          return  window.location.href.includes('/admin')
        } 
    }
    const { width } = useViewportSize();

    useEffect(()=>{
        if('serviceWorker' in navigator){
            if(typeof window !== 'undefined'){
                window.addEventListener('load', function(){
                    serviceWorkerRegistration.register();
                })
            }
        }
    },[])

    const Menu = () => {
        const [menuWidth, setMenuWidth] = useState("calc(100vw - 45px)");
        const [height, setHeight] = useState(250);
        const [opacity, setOpacity] = useState(1)
        const [display, setDisplay] = useState('block')
        const close = () => {
            setMenuWidth("0px");
            setHeight(0);
            setOpacity(0);
            
            setTimeout(()=>{
                setDisplay('none');
                setShowMobileMenu(false);
            },100)
        }
        return (
    
                <Affix style={{zIndex:1000}} position={{ bottom: 20, right: 20 }}>
                    <motion.div
                        animate={{width:menuWidth, height, display}}
                        className="mobile-menu" style={{position:"relative"}}>
                            <motion.div 
                            animate={{opacity}}
                            transition={{ duration:0}}
                            
                            className="items">
                                <a href="/">Home</a>
                                <a href="/about">About</a>
                               
                                <div className="icons">
                                    <Anchor href="https://github.com/callummclu">
                                        <BsGithub aria-label="github" color={'white'} size={18}/>
                                    </Anchor>
                                    <Anchor href="https://www.linkedin.com/in/callummclu/">
                                        <BsLinkedin aria-label="linkedin" color={'white'} size={18}/>
                                    </Anchor>
                                </div>
                            </motion.div>


                            <button onClick={close} className='close'>
                                <CgClose color="white" size={40}/>
                            </button>

                    </motion.div>
                </Affix>
    
        )
    }

    return (
        <>
        {showMobileMenu && width < 500 && <Menu/>}
             {width < 500 && <Affix position={{ bottom: 20, right: 20 }}>
            <ActionIcon
                aria-label='open menu'
                radius='xl'
                variant='filled'
                onClick={()=>setShowMobileMenu(true)}
                color={'teal'}
                size={60}
            >
                <GiHamburgerMenu size={30} />
            </ActionIcon>
      </Affix>}
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

