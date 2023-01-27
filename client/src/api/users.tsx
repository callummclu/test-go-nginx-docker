export function checkAuth(){
    let token = localStorage.getItem("gocial_auth_token")
    if(token){

        const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/${token}`)
        return response
    }
    return new Promise((rej)=>{
        rej('error')
    })
}

export function getUserDetails(username:string){
    const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/user/${username}`)
    return response
}  
