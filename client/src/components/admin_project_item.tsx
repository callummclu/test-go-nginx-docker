import { Badge, Card, Group} from "@mantine/core"

export interface ProjectPost{
    title:string;
    description:string;
    image:string;
    id:string|number;
}

export const AdminProjectItem = ({title,description,image,id}:ProjectPost) => {

    return (
        <Card className="project-item admin" withBorder >
            <Group mb="md">
            <Badge color={'gray'}>edit</Badge>
            <Badge color={'red'}>delete</Badge>
            </Group>
            <div className="image" style={image ? {backgroundImage:`url(${image})`} : {}}/>
            <div className="description">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </Card>
    )
}