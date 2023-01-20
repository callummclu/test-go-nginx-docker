import '../styles/sass/banner.scss'

export const Banner = () => {
    return (
        <div className="banner">
            <div className='text-container'>
                <h1>Hi I'm Callum McLuskey.<br/>A Full stack engineer</h1>
                <p>Gradute software engineer with a variety of professional and personal experience working across the full-stack of software development.</p>
            </div>
            <div className='image' style={{backgroundImage:'url(https://svgshare.com/i/peX.svg)'}}>
            </div>
        </div>
    )
}