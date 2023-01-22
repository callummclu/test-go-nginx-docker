<h1><a href="https://callummclu.co.uk">callummclu.co.uk</a></h1>

a small web app built to serve my personal portfolio, built specifically with speed and architecture in mind.

<div style="display:flex; gap: 10px">
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145113-6edd1580-87c8-41b5-9adc-913a5b2476e6.png"/>
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145394-c6d8717a-fe27-4f92-ba62-01f700c1245a.png"/>
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145493-2c6cdb54-e691-4446-be4a-3332e5d729d0.png"/>
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145589-65bb7441-915d-46f2-ac0c-751fbf85a693.png"/>
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145699-fe617d49-0710-442c-8153-d4141f5c099e.png"/>
<image style="height:80px" src="https://user-images.githubusercontent.com/20967589/213145764-1cf3452e-4b0b-4317-8513-11fcefc72837.png"/>
</div>

## Running this project on a linux server

- First ensure docker-compose is installed on the server. An example of how to do this on debian 11 is [here](https://cloudinfrastructureservices.co.uk/how-to-install-and-use-docker-compose-on-debian-11/)
- add your ssl certificate `certificate.cer` and key `key.key` to `/data/certs` within the linux server, this will not exist so youll have to make the directory, using `nano /data/certs/certificate.cer` and `nano /data/certs/key.key` pasting the values in and saving.
- In addition to adding the ssl certificate add a `~/config` folder with `.env` and `.fronetend.env` in them following the conventions of the example equivelants in the repo.
- From here create a new directory for your project, in this case I added a `callummclu.co.uk` in the root directory.
- Following this ensure git is installed in the server using `sudo apt install git`
- After this run git pull in your newly created directory.
- Finally run the deploy script using `bash deploy.sh`, doing this will run docker-compose and build the image.

_There may be additional changes needed for ensuring that nginx allows outward https but my server did not require this._
