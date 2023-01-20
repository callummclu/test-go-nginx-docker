import "../styles/sass/projects.scss"
import { ProjectItem } from "./project_item"

export const Projects = () => {
    return (
        <>
            <h1 style={{textAlign:'center'}}>Projects / Work</h1>
        <div className="projects">
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
        </div>
        </>
    )
}