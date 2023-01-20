import { Anchor, UnstyledButton } from '@mantine/core'
import '../styles/sass/nav.scss'
import { BsGithub,BsLinkedin } from 'react-icons/bs'

export const Nav = () => {
    return (
        <div className='nav'>
            <div className='section'>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
            <div className='section'>
                <Anchor href="https://github.com/callummclu">
                    <BsGithub color={'gray'} size={18}/>
                </Anchor>
                <Anchor href="https://www.linkedin.com/in/callummclu/">
                    <BsLinkedin color={'gray'} size={18}/>
                </Anchor>
            </div>
        </div>
    )
}