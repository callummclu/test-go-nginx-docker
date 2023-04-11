import { useRouter } from "next/router";

export default function OrganisationView(){
    const router = useRouter()
    const { id } = router.query;
    return (
        <>
        <h1>This page is under construction</h1>
        <p>{id}: This page will eventually show all projects in this organisation, for now visit <a href={`${window.location.origin}/project`}>here</a> to view all the posts</p>
        </>
    )
}