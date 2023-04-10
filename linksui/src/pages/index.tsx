import {Fragment} from 'react'
import {BsMedium,BsGithub,BsLinkedin} from 'react-icons/bs'
import {CgWebsite} from 'react-icons/cg'
import Head from 'next/head'
const iconSettings = {
  size:40,
  color:'#3b3b3b'
}

const links = [
  {icon:<BsGithub {...iconSettings}/>, title:"GitHub",link:"https://github.com/callummclu"},
  {icon:<BsLinkedin {...iconSettings}/>, title:"Linkedin",link:"https://linkedin.com/in/callummclu"},
  {icon:<BsMedium {...iconSettings}/>, title:"Medium",link:"https://callummclu.medium.com/"},
  {icon:<CgWebsite {...iconSettings}/>, title:"My personal site",link:"https://callummclu.co.uk"},
]

export default function Home() {
  return (
    <>
    <Head>
            <title>Callum McLuskey</title>
            <meta name="description" content="Hi i'm Callum McLuskey a 4th year student at Glasgow University and avid Full stack software engineer working at guitarguitar." />
        </Head>
    <header className="mb-24 p-4 flex flex-col items-center justify-center w-screen h-40 bg-emerald-600" style={{backgroundPosition:'center',backgroundSize:"cover",backgroundImage:'url("https://static.callummclu.co.uk/links/header.webp")'}}>
      <img className="absolute top-20 w-40 rounded-full" src="https://static.callummclu.co.uk/main/me2.webp"/>
    </header>
    <main>
      <header>
        <h1 className="text-center text-3xl">Callum McLuskey</h1>
        <p className="text-center text-gray-500">Full stack developer</p>
      </header>
      <section className="flex flex-col items-center justify-center mt-10">
        {links.map(item => <Card {...item}/>)}
      </section>
    </main>
    </>
  )
}

const Card = ({icon, title, link}:{icon:JSX.Element, title:string, link:string }) => {
  return (
    <a href={link}>
    <div className='rounded flex mb-5 items-center h-20 bg-gray-200' style={{width:'clamp(350px,70vw,1000px)'}}>
      <div className="mx-5">{icon}</div>
      <h1 className='text-lg' style={{color:"#3b3b3b"}}>{title}</h1>
    </div>
    </a>
  )
}