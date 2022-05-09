import React from "react";
import Register from "./Register";
import Login from "./Login";
import Table from "./Table";
import TimeSheetForm from "./TimeSheetForm";
import { Container, Row, Col } from 'reactstrap';

export default function DashBoard() {
  return (
    <>

    <div className="columns">
                  <div className="column"></div>
                  <div className="column m-5 is-two-thirds">
                    <div className="columns">
                     <div>
                         <h1> DashBoard</h1>
                      </div>

                    </div>
                  </div>
                  <div className="column"></div>
              </div>

    </>
    );
}