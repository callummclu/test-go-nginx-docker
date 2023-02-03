import styles from '../styles/sass/container.module.scss'
import { Footer } from './footer'

export const Container = ({children,isAdmin}:any) => {
    return (
        <>
        <div className={`${!isAdmin && styles.container}`}>
            {children}
        </div>
        <Footer/>
        </>
    )
}