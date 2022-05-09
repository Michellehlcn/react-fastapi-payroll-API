if [ $1 == "start" ]
then
    source .env/bin/activate
    cd ./backend && uvicorn main:app --reload &
    cd ../frontend/src && npm run start &
elif [ $1 == "stop" ]
then
    kill %{1,2}
    deactivate
else
    echo "$1 is not a valid argument. Only \"start\" and \"stop\" accepted"
fi