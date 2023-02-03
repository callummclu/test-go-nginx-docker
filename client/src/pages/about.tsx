import { Group, Stack, Timeline, Title, Text, Avatar, Container } from "@mantine/core"
import { motion, Variants } from "framer-motion";
import '../styles/sass/banner.scss'

interface ExperienceProps {
    company:string;
    title:string;
    period:string;
    description:JSX.Element;
    current:boolean;
    image:string;
}

const experiences:ExperienceProps[] = [
    {
        company:"CREATe",
        title:"Software Engineer",
        period:"Aug 2021 - Apr 2022",
        description:<>•	Developed a backend capable of performing user authentication as well as basic REST api calls using laravel.
        <br/>•	Used React to develop a responsive front end site to allow users easy navigation to old copyright documents including search functionality and filtering.
        <br/>•	Followed agile methodologies with heavy emphasis on retrospectives, scrum meetings and pair programming.
        <br/>• During this position I learned how to adapt and overcome the usage of unknown technologies to solve a common problem</>,
        current:false,
        image:"https://static.callummclu.co.uk/experience/create-logo.webp"
    },
    {
        company:"Evata",
        title:"Intern Full-stack engineer",
        period:"Mar 2022 - Jun 2022",
        description:<>•	Built and implement a full stack web service.
        <br/>•	Used Typescript, node.js and express.js to create a backend service that would forward calls to a separate spring backend to deal with API calls such as REST api calls to improve security.
        <br/>•	Created a responsive frontend using typescript, React as well as materialUI to allow users to have a clean communication point to backend services.
        <br/>•	Utilised Jira and Miro to enforce an agile work flow utilising a kanban board along with regular retrospectives and pair programming.
        <br/>• This position pushed me to work on all aspects of the stack and gain a deeper understanding of how it all communicates and functions together</>,
        current:false,
        image:"https://static.callummclu.co.uk/experience/evata-logo.webp"
    },
    {
        company:"Guitarguitar",
        title:"Software Engineer",
        period:"Jun 2022 - Present",
        description:<>            •	Helped maintain a top 100 UK e-commerce website, alongside implement new features based on the company’s different departments needs/wants.
        <br/>•	Used React and .NET (C#) to help develop a new admin side content management system, further used these technologies to work on barcode scanning systems.
        <br/>•	Followed many standard agile procedures, such as daily stand-ups, knowledge sharing alongside participating in spec’ing sessions in which I was the product owner.
        <br/>•	Utilised Azure DevOps to enforce agile workflow, enabling me to take part in pull request reviews and better understand the whole system.
        <br/>• Lead and owned the addition of the clearpay payment method to the high traffic site, utilising Test Driven Development alongside regular peer programming to both explain my process to the team and understand better methods of approaching the same problems
             • During my time here I learned how to work on a massive piece of software and understand the methods used to keep a system like this running 24/7.
        </>,
        current:true,
        image:"https://static.callummclu.co.uk/experience/guitarguitar-logo.webp"
    },

]

   const cardVariants: Variants = {
        onscreen: {
          y: 50,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.8
          }
        }
      };

export const About = () => {
    return (
        <>
                            <motion.div
      className="card-container-banner"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
                    <motion.div className="card" variants={cardVariants}>

            <div className="banner">
                <div className='image' style={{backgroundImage:`url(https://static.callummclu.co.uk/main/banner_image.webp)`}}>
                </div>
                <div className='text-container'>
                    <Title>Hey 👋, I'm Callum McLuskey. </Title>
                    <Text>I'm a recent graduate with passion for all things software, from web (as a full stack developer), mobile to cli applications. I love venturing into areas such as UI/UX incorporating graphic design wherever possible.</Text>
                    <Text>Outside of software and work I love sketching and photography, right now im focused on architecture and the buildings all about Glasgow and all their hidden secrets.</Text>
                </div>
            </div>
            </motion.div>
            </motion.div>
            <Title order={2} sx={{textAlign:'center',marginTop:100, fontSize:30, marginBottom:0}}>💻 Work Experience</Title>
            <Container>
            <Timeline color="green" mt={75}>
                {experiences.map((exp) => <Timeline.Item key={exp.period} bullet={<Avatar src={exp.image}/>} title={exp.company}>
                    <Stack spacing={0}>
            <Group spacing={5} w={"100%"}>
            <Text size="md" sx={{fontWeight:200}}>{exp.title}</Text>
            </Group>
            <Text size="sm" color={'dimmed'}>{exp.period}</Text>
            </Stack>
            <Text size="xs" mt={3} color={"gray"} c={'rgb(60,60,60)'}>
                {exp.description}
            </Text>
                </Timeline.Item>)}
            </Timeline>
            </Container>
        </>
    )
}