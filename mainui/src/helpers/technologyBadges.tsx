import {
    SiTypescript, 
    SiExpress, 
    SiGo,
    SiReact,
    SiPostgresql,
    SiNextdotjs,
    SiNginx,
    SiNpm,
    SiSocketdotio,
    SiDocker
} from 'react-icons/si'

export const getTechnologyBadgeContent = (technology:string) => {

    let icon = <></>;
    let color;

    switch(technology.toUpperCase()){
        case "TYPESCRIPT":
            icon = <SiTypescript/>;
            color = 'blue';
            break;
        case "GO":
            icon = <SiGo/>;
            color = 'cyan';
            break;
        case "EXPRESSJS":
            icon = <SiExpress/>;
            color = 'gray'
            break
        case "REACT":
            icon = <SiReact/>;
            color = 'cyan';
            break;
        case "POSTGRES":
            icon = <SiPostgresql/>;
            color = 'indigo';
            break;
        case "NEXTJS":
            icon = <SiNextdotjs/>;
            color = 'dark';
            break;
        case "NGINX":
            icon = <SiNginx/>;
            color = "green";
            break;
        case "WEBSOCKETS":
            icon = <SiSocketdotio/>;
            color = 'dark';
            break;
        case "DOCKER":
            icon = <SiDocker/>;
            color = 'blue';
            break;
        case "NPM":
            icon = <SiNpm/>;
            color = 'red';
            break;
        default:
            icon = <></>;
            color = 'gray';
            break;
    }

    return {
        technology,
        icon,
        color
    }
}