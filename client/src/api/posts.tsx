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