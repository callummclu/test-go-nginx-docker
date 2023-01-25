import { Stack } from "@mantine/core"
import { ExperienceItem, ExperienceProps } from "./experienceItem"

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
        image:"https://pbs.twimg.com/profile_images/2737178867/b07a030f3f94e8e08852b9621c0c4ef2_400x400.jpeg"
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
        image:"https://media.licdn.com/dms/image/C4E0BAQETmo2TuHH_0g/company-logo_200_200/0/1643144682676?e=1682553600&v=beta&t=um7cMbGwqUtSxLrmzJ8yQh6QJ7bgpTTnFOT146Ciqkg"
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
        image:"https://pbs.twimg.com/profile_images/1231894269138526210/-w2y5V38_400x400.jpg"
    },

]

export const Experience = () => {
    return(
        <Stack spacing={0} mb="xl">
            <h2 style={{textAlign:'center', fontSize:30}}>Work Experience</h2>
            <p style={{textAlign:'center'}}>Places ive worked since the start of my career.</p>
            <div style={{marginTop:40,display:'flex', flexDirection:'column-reverse', justifyContent:'center', alignItems:'center', gap:20}}>
            {experiences.map((exp) => <ExperienceItem {...exp}/>)}
            </div>
        </Stack>
    )
}