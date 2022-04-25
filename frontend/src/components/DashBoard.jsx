import React from "react";
import Register from "./Register";
import Login from "./Login";
import Table from "./Table";
import TimeSheetForm from "./TimeSheetForm";


export default function DashBoard() {
  return (
    <>

    <div className="columns">
                  <div className="column"></div>
                  <div className="column m-5 is-two-thirds">
                    <div className="columns">
                     <div><Table /><TimeSheetForm /></div>

                    </div>
                  </div>
                  <div className="column"></div>
              </div>

    </>
    );
}