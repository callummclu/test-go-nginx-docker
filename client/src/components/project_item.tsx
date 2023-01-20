import { Card, LoadingOverlay, Skeleton } from "@mantine/core"
import { useState } from "react"

const SkeletonContent = () => {
    return (
        <>
            <Skeleton height={'65%'} radius="md"/>
            <Skeleton height={'12.5%'} mt={6} radius="md" />
            <Skeleton height={'7%'} mt={6} radius="xl" />
            <Skeleton height={'7%'} mt={6} width="90%" radius="xl" />
        </>
    )
}

export const ProjectItem = () => {

    const [loading,setLoading] = useState(true)

    return (

        <Card className="project-item" withBorder >
            {loading ? <SkeletonContent/> : "Content"}
        </Card>
    )
}