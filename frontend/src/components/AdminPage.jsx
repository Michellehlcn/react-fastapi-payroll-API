import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";

import Loader from "./Loader.jsx";
import AllUsers, {SelectColumnFilter,StatusPill } from "./AllUsers.jsx";

import FastAPIClient from '../client';
import config from '../config';
import { NotLoggedIn } from "./NotLoggedIn";
import jwtDecode from "jwt-decode";
import * as moment from "moment";

const client = new FastAPIClient(config);


const AdminPage = () => {
     //const classes = useStyles();
     const [data, setData] = useState([]); // use an empty array as initial value
     const [loading, setLoading] = useState(false)
     //const navigate = useNavigate()
     // const [isLoggedIn, setIsLoggedIn] = useState(false);
     // const [loading, setLoading] = useState(true);
     // const [user, setUser] = useState([]);
     // const [searchValue, setSearchValue] = useState("");
     // const [refreshing, setRefreshing] = useState(true);

     // useEffect(() => {
     //      // FETCH Users
     //      fetchUsers()
     // }, [])

     // const fetchUsers = (search) => {
     //      if (searchValue?.length <= 0 && search)
     //           return alert("Please Enter Search Text")
     //      // SET THE LOADER TO TURE
     //      setLoading(true)

     //      // GET THE RECIPIES FROM THE API
     //      client.getTrainers(searchValue).then((data) => {
     //           setLoading(false)

     //           // SET THE RECIPIES DATA
     //           setUser(data?.results)
     //      });
     // }

     // useEffect(() => {
     //      const tokenString = localStorage.getItem("token");
     //      if (tokenString) {
     //           const token = JSON.parse(tokenString);
     //           const decodedAccessToken = jwtDecode(token.access_token);
     //           if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
     //                setIsLoggedIn(true);
     //           }
     //      }
     // }, []);

     //if (refreshing) return !isLoggedIn ? <NotLoggedIn /> : <Loader />;
     useEffect(() => {
         client.getUsers()   
           .then((res) => {
               console.log(res);
               setData(res.data); // set the state
               }
               )
           .catch((err) => {
               console.log(err);
           });}, []);

     const columns = React.useMemo(
         () => [
           {
             Header: "Email",
             accessor: "email",
               imgAccessor: "imgUrl",
               emailAccessor: "email",
           },
           {
             Header: "ID",
             accessor: "id",
           },
          {
             Header: "Title",
             accessor: "",
           },
           {
             Header: "Status",
             accessor: "active",
             Cell: StatusPill,
           },
           {
             Header: "Role",
             accessor: "role",
             Filter: SelectColumnFilter,  
             filter: 'includes', 
           },
         ],
         []
       );
     //const data = React.useMemo(() => getData(), []);

     return (
          <>
          <div className="bg-gray-100 text-gray-900">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                  <div className="">
                    <h1 className="text-xl font-semibold">All Users</h1>
                  </div>
                    <div className="mt-4">
                         <AllUsers columns={columns} data={data} />
                    </div>
               </main>
          </div>


{/*

                    {/*<div className="container px-5 py-12 mx-auto lg:px-20">

                         <div className="flex flex-col flex-wrap pb-6 mb-12 text-white ">
                              <h1 className="mb-6 text-3xl font-medium text-white">
                                   ALL Users
                              </h1>
                              {/* <!-- This is an example component --> */}
{/*                              <div className="container flex justify-center items-center mb-6">
                                   <div className="relative w-full max-w-xs m-auto">
                                        <input
                                             type="text"
                                             onChange={(e) => setSearchValue(e.target.value)}
                                             className={`text-teal-500 z-20 hover:text-teal-700 h-14 w-full max-w-xs m-auto pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none`} placeholder="Search Users..." />
                                        <div className="absolute top-2 right-2">
                                             <button onClick={() => fetchUsers(true)} className="h-10 w-20 text-white rounded bg-teal-500 hover:bg-teal-600">Search</button>
                                        </div>
                                   </div>
                              </div>*/}
                              {/* <p className="text-base leading-relaxed">
              Sample recipes...</p> */}
{/*                              <div className="mainViewport">*/}
                                   {/*<RecipeTable
                                        recipes={recipes}
                                   />*/}


          </>
     )
}

export default AdminPage;
