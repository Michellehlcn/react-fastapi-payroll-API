
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


export default function AllUsers() {
  return (
    <>    
  
            <Resource name="users" list={ListGuesser} />

    </>
    );
};


