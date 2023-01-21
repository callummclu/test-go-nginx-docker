import '../styles/sass/banner.scss'

export const AboutBanner = () => {
    return (
        <div className="banner">
            <div className='image' style={{backgroundImage:'url(https://i.imgur.com/VXrSp2r.jpg)'}}>
            </div>
            <div className='text-container'>
                <h1>Hey, I'm Callum McLuskey. </h1>
                <p>I'm a recent graduate with passion for all things software, from web (as a full stack developer), mobile to cli applications. I love venturing into areas such as UI/UX incorporating graphic design wherever possible.</p>
                <p>Outside of software and work I love to draw, right now im focused on architecture and the buildings all about Glasgow.</p>
            </div>
        </div>
    )
}