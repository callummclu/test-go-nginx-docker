import { Anchor, Divider, Text, Title } from '@mantine/core'
import '../styles/sass/footer.scss'

export const Footer = () => {
    return (
        <div className="footer">
            <Divider mb="md"/>
            <Text pt="xs">Thanks for visiting my site, feel free to contact me on <Anchor style={{color:"darkgreen"}} href="https://www.linkedin.com/in/callummclu/">linkedin</Anchor> or on email via <Anchor style={{color:"darkgreen"}} href="mailto:callummcluskey100@gmail.com">callummcluskey100@gmail.com</Anchor></Text>
        </div>
    )
}