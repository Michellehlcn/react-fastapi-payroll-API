# react-fastapi-payroll-API
Work In Progress

### Instruction 
python3 -m venv .env
source .env/bin/activate

### Install requires
pip3 install -r requirements.txt

### Install react dependencies
cd ./frontend/src && npm install

### Start app
### Run api
cd ./backend/app/app && uvicorn main:app -- reload

### Run react
npm start 

## Screenshot Review
### Authentication Dashboard
![Screen Shot 2022-05-04 at 11 25 24 pm](https://user-images.githubusercontent.com/83108919/166690840-737406d1-3923-4b2c-bde0-98ea44d71525.png)


### Update Profile Form
![Screen Shot 2022-04-19 at 7 36 25 am](https://user-images.githubusercontent.com/83108919/163883903-285bb961-53aa-45f8-b160-61d3b1b3fec3.png)

### TimeSheet View - Trainer View
![Screen Shot 2022-05-15 at 8 17 30 pm](https://user-images.githubusercontent.com/83108919/168467901-27702e7a-46c1-435d-8eea-f045375b33fb.png)

### Filing Timesheet Form
![Screen Shot 2022-05-29 at 6 48 12 pm](https://user-images.githubusercontent.com/83108919/170859974-27d9df2e-6ec6-4ce6-b430-e82ca2993d93.png)

### Admin Page View
![Screen Shot 2022-05-09 at 12 12 56 am](https://user-images.githubusercontent.com/83108919/167300385-e6ca3efc-8482-41f9-bde7-87bf0c0c708b.png)

### API EndPoints
![Screen Shot 2022-05-03 at 8 40 54 am](https://user-images.githubusercontent.com/83108919/166690946-db6a22eb-e1fc-40c8-8c23-008dc2c4cc04.png)


# Deploy by using Docker locally
Please create Docker account

### Docker login
docker login -u UserName
  
### Run Docker
docker-compose -f docker-compose.local.yml up -d
  
### When the process completes, please run and you should see two containers running:
docker ps


# Deploy to Heroku by using Docker
### Login into Heroku account
Heroku login
  
### Login into Heroku container:login
heroku container:login
  
### Create new app named: "react-fastapi-payroll" for the backend and "react-fastapi-payroll-frontend" 
These repos unique so you should create yours accordingly
  
### Update the makefile 
  for your heroku API token (Please use the long-lived user authorization) 
  and app names
### Deploying backend: Run the command lines
make build-app-heroku --> This will create the Image registry.heroku.com/XXX
  
make push-app-heroku
  
make release-heroku
  
### Check the app
heroku ps --app ${Your_App_Name}
  
### Deploying frontend
make deploy-frontend-heroku
