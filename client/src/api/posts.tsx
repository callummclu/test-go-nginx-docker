export async function getAllPosts(){
    const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/post`,{
        method:"GET"
    })
    return response
}

export async function getSinglePost(id:string | number){
    const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/post/${id}`,{
        method:"GET"
    })
    return response
}

interface Post{
    title:string;
    description:string;
    body:string;
    image:string;
}

export async function createPost(post:Post){
    const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/post`,{
        method:"POST",body:JSON.stringify(post)
    })
    return response
}