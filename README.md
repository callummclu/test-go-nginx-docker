<h1><a href="https://callummclu.co.uk">callummclu.co.uk</a></h1>

a small web app built to serve my personal portfolio, built specifically with speed and architecture in mind.

- go
- nextjs
  - sass
  - mantineUI
- nginx
- docker
- digital ocean
  - debian 11

## Running this project on a linux server

- First ensure docker-compose is installed on the server. An example of how to do this on debian 11 is [here](https://cloudinfrastructureservices.co.uk/how-to-install-and-use-docker-compose-on-debian-11/)
- add your ssl certificate `certificate.cer` and key `key.key` to `/data/certs` within the linux server, this will not exist so youll have to make the directory, using `nano /data/certs/certificate.cer` and `nano /data/certs/key.key` pasting the values in and saving.
- In addition to adding the ssl certificate add a `~/config` folder with `.env` and `.fronetend.env` in them following the conventions of the example equivelants in the repo.
- From here create a new directory for your project, in this case I added a `callummclu.co.uk` in the root directory.
- Following this ensure git is installed in the server using `sudo apt install git`
- After this run git pull in your newly created directory.
- Finally run the deploy script using `bash deploy.sh`, doing this will run docker-compose and build the image.

_There may be additional changes needed for ensuring that nginx allows outward https but my server did not require this._
