# Update the Heroku names to match yours
# Add the HEROKU_API_KEY environment variable to your system
# (and to your CI tool env vars if running in CI)
HEROKU_APP_NAME="react-fastapi-payroll"
HEROKU_FRONTEND_APP_NAME="react-fastapi-payroll-frontend"
COMMIT_ID=$(shell git rev-parse HEAD)
HEROKU_API_KEY= "f2c4ac57-1a88-4d62-bf3e-50f30f4aa818"


heroku-login:
	HEROKU_API_KEY=${HEROKU_API_KEY} heroku auth:token

heroku-container-login:
	HEROKU_API_KEY=${HEROKU_API_KEY} heroku container:login

build-app-heroku: heroku-container-login
	docker build -t registry.heroku.com/$(HEROKU_APP_NAME)/web ./backend

push-app-heroku: heroku-container-login
	docker push registry.heroku.com/$(HEROKU_APP_NAME)/web

release-heroku: heroku-container-login
	heroku container:release web --app $(HEROKU_APP_NAME)

deploy-frontend-heroku: heroku-login
	cd .. && git subtree push --prefix fastapi/frontend https://heroku:${HEROKU_API_KEY}@git.heroku.com/$(HEROKU_FRONTEND_APP_NAME).git main


.PHONY: heroku-login heroku-container-login build-app-heroku push-app-heroku deploy-frontend-heroku