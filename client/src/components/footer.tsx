import { Anchor, Divider, Text, Title } from '@mantine/core'
import '../styles/sass/footer.scss'

export const Footer = () => {
    return (
        <div className="footer">
            <Divider mb="md"/>
            <Title pt="xs" order={5}>Thanks for visiting my site, feel free to contact me on <Anchor style={{color:"#12b886"}} href="https://www.linkedin.com/in/callummclu/">linkedin</Anchor> or on email via <Anchor style={{color:"#12b886"}} href="mailto:callummcluskey100@gmail.com">callummcluskey100@gmail.com</Anchor></Title>
        </div>
    )
}