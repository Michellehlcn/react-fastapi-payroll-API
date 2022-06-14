import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";

import Loader from "./Loader.jsx";
import AdminPageAllUsers, {SelectColumnFilter,StatusPill } from "./AdminPage.AllUsers.jsx";

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
                         <AdminPageAllUsers columns={columns} data={data} />
                    </div>
               </main>
          </div>
          </>
     )
}

export default AdminPage;
