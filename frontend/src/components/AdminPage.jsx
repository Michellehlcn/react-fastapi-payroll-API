import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";
import Footer from "./Footer.jsx";
import Loader from "./Loader.jsx";

import FastAPIClient from '../client';
import config from '../config';

const client = new FastAPIClient(config);


const AdminPage = () => {
     const [loading, setLoading] = useState(true)
     const [user, setUser] = useState([])
     const [searchValue, setSearchValue] = useState("")

     useEffect(() => {
          // FETCH THE RECIPIES
          fetchUsers()
     }, [])

     const fetchUsers = (search) => {
          if (searchValue?.length <= 0 && search)
               return alert("Please Enter Search Text")
          // SET THE LOADER TO TURE
          setLoading(true)

          // GET THE RECIPIES FROM THE API
          client.getTrainers(searchValue).then((data) => {
               setLoading(false)

               // SET THE RECIPIES DATA
               setUser(data?.results)
          });
     }
     if (loading)
          return <Loader />

     return (
          <>
                    <div className="container px-5 py-12 mx-auto lg:px-20">

                         <div className="flex flex-col flex-wrap pb-6 mb-12 text-white ">
                              <h1 className="mb-6 text-3xl font-medium text-white">
                                   ALL Users
                              </h1>
                              {/* <!-- This is an example component --> */}
                              <div className="container flex justify-center items-center mb-6">
                                   <div className="relative w-full max-w-xs m-auto">
                                        <input
                                             type="text"
                                             onChange={(e) => setSearchValue(e.target.value)}
                                             className={`text-teal-500 z-20 hover:text-teal-700 h-14 w-full max-w-xs m-auto pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none`} placeholder="Search Users..." />
                                        <div className="absolute top-2 right-2">
                                             <button onClick={() => fetchUsers(true)} className="h-10 w-20 text-white rounded bg-teal-500 hover:bg-teal-600">Search</button>
                                        </div>
                                   </div>
                              </div>
                              {/* <p className="text-base leading-relaxed">
              Sample recipes...</p> */}
                              <div className="mainViewport">
                                   {/*<RecipeTable
                                        recipes={recipes}
                                   />*/}
                              </div>
                         </div>
                    </div>


          </>
     )
}

export default AdminPage;
