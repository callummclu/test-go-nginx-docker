import '../styles/sass/container.scss'
import { Footer } from './footer'

export const Container = ({children,isAdmin}:any) => {
    return (
        <>
        <div className={`${!isAdmin && "container"}`}>
            {children}
        </div>
        <Footer/>
        </>
    )
}