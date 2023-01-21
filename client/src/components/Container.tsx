import '../styles/sass/container.scss'

export const Container = ({children,isAdmin}:any) => {
    return (
        <div className={`${!isAdmin && "container"}`}>
            {children}
        </div>
    )
}