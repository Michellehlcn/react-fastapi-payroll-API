# react-fastapi-payroll-API
Working In Progress

### Instruction 
python3 -m venv .env
source .env/bin/activate

### Install requires
pip3 install -r requirements.txt

### Install react dependencies
cd ./frontend/src && npm install

### Start app
### Run api
cd ./backend && uvicorn main:app -- reload

### Run react
npm start 

## Screenshot Review
### Authentication Dashboard
![Screen Shot 2022-04-19 at 7 35 04 am](https://user-images.githubusercontent.com/83108919/163883813-b687772e-2390-4689-a0c3-e40932afd2a3.png)

### Update Profile Form
![Screen Shot 2022-04-19 at 7 36 25 am](https://user-images.githubusercontent.com/83108919/163883903-285bb961-53aa-45f8-b160-61d3b1b3fec3.png)

### Filing Timesheet Form

### Admin Dashboard
![Screen Shot 2022-04-19 at 7 35 51 am](https://user-images.githubusercontent.com/83108919/163883933-bd17a4df-b257-4e69-8e4a-f197a9b2ae32.png)

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
