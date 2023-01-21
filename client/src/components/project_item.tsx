import { Anchor, Card} from "@mantine/core"

export interface ProjectPost{
    title:string;
    description:string;
    image:string;
    id:string|number;
}

export const ProjectItem = ({title,description,image,id}:ProjectPost) => {

    return (

        <Anchor style={{textDecoration:'none'}} href={`${window.location.origin}/p/${id}`}>
            <Card className="project-item" withBorder >
                <div className="image" style={image ? {backgroundImage:`url(${image})`} : {}}/>
                <div className="description">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </Card>
        </Anchor>
    )
}