import { Anchor, UnstyledButton } from '@mantine/core'
import '../styles/sass/nav.scss'
import { BsGithub,BsLinkedin } from 'react-icons/bs'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'

export const Nav = () => {

    const [menuOpen,setMenuOpen] = useState(false)

    const openMenu = () => setMenuOpen(!menuOpen)

    return (
        <div className={`nav ${menuOpen && 'open'}`}>
            <UnstyledButton aria-label="menu button" onClick={openMenu} className='hamburger'>{menuOpen ? <IoMdClose color={'grey'} size={24}/> :<BiMenu color={'gray'} size={24}/>}</UnstyledButton>
            <div className={`section ${menuOpen && 'show'}`}>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
            <div className={`section ${menuOpen && 'show icons'}`}>
                <Anchor href="https://github.com/callummclu">
                    <BsGithub aria-label="github" color={'gray'} size={18}/>
                </Anchor>
                <Anchor href="https://www.linkedin.com/in/callummclu/">
                    <BsLinkedin aria-label="linkedin" color={'gray'} size={18}/>
                </Anchor>
            </div>
        </div>
    )
}