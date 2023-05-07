<p align="center">
<img width="200px" src="https://user-images.githubusercontent.com/20967589/231171518-af4ea875-0f24-4d6b-9da6-98b539869eb7.png"/>
<h3 align="center">Callummclu.co.uk</h3>
<p align="center">Welcome to my portfolio site</p>
</p>

----

[callummclu.co.uk](https://callummclu.co.uk) is a small web app built to serve my personal portfolio, built specifically with speed and architecture in mind. 😊

## Site areas 🏗️

The web application makes use of different subdomains to handle different aspects of the site, ranging from API's for data access to CDN site for hosting static files below are whats available.

#### www.callummclu.co.uk

This is the main client facing site, this enables viewing of the main content on the site.

#### [admin.callummclu.co.uk](https://admin.callummclu.co.uk)

This allows me to control the content on the client facing site through a well contructed administrative portal

#### [links.callummclu.co.uk](https://links.callummclu.co.uk)

Similar to linktree this site serves as a lightweight site to quickly provide access to all my relevant links including github, linkedin, medium and the main site.

#### [api.callummclu.co.uk](https://api.callummclu.co.uk)

To enable access with the database and enable the administative portal the api site handles crud operations on posts as well as JWT enabled authentication to access the admin site.

#### [static.callummclu.co.uk](https://static.callummclu.co.uk)

To ensure the site runs as fast as possible all static images are stored on the cdn site, this is fully equiped with life long caching and also stores the sites javascript and css files.

## What is the site built with 👷🏻

| Technology | Use case |
| --         |     --   |
| go| A golang backend enabled by gin gonic is used to enable a fast and lightweight web api to handle authentication and basic crud operations for the administrative site |
| nextjs | next is used for every front end piece of the site, including the admin site, main client facing site and the links site enabling transferrable components and consistent design, whilst keeping the site fast |
| sass | for any custom styling sass and sass modules were used to enable fast loading times and as little code repetition as possible |
| mantineUI | To keep a consistant design language whilst reducing development time mantine was chosen as the component library, I chose this over material because I dont like the way materialUI looks |
| NGINX | |
| Docker | |
| Debian 11 | |

## Running this project on a linux server 🏃🏻

- First ensure docker-compose is installed on the server. An example of how to do this on debian 11 is [here](https://cloudinfrastructureservices.co.uk/how-to-install-and-use-docker-compose-on-debian-11/)
- add your ssl certificate `certificate.cer` and key `key.key` to `/data/certs` within the linux server, this will not exist so youll have to make the directory, using `nano /data/certs/certificate.cer` and `nano /data/certs/key.key` pasting the values in and saving.
- In addition to adding the ssl certificate add a `~/config` folder with `.env` and `.fronetend.env` in them following the conventions of the example equivelants in the repo.
- From here create a new directory for your project, in this case I added a `callummclu.co.uk` in the root directory.
- Following this ensure git is installed in the server using `sudo apt install git`
- After this run git pull in your newly created directory.
- Finally run the deploy script using `bash deploy.sh`, doing this will run docker-compose and build the image.

_There may be additional changes needed for ensuring that nginx allows outward https but my server did not require this._
