import React from "react"
import {Link} from "react-router-dom"

export const NotLoggedIn = () => 

<div className="flex flex-col " id="notfound">
    <div className="notfound text-black">
        <div className="notfound-404">
            <h1 className="mt-4">404</h1>
            <h2>Login To Access The Page</h2>
        </div>
        <Link to="/" className="rounded text-black" >Go TO LOGIN</Link>
    </div>
</div>