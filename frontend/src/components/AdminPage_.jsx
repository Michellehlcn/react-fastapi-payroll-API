import React, { Component } from "react";
import FastAPIClient from '../client';
import config from '../config';
import AdminPageTimeSheet from "./AdminPage.TimeSheet";

const client = new FastAPIClient(config);

class AdminPage_ extends Component {
    state = {
        timesheets: []
      };
    
      componentDidMount() {
        this.resetState();
      }
    
      getTS = () => {
        client.getTimeSheet()
        .then(res => {
          this.setState({ timesheets: res.data });
          console.log(res);
        });
      };
    
      resetState = () => {
        this.getTS();
      };
render() {
    return (
         <>
         <div className="bg-gray-100 text-gray-900">
               <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                 <div className="">
                   <h1 className="text-xl font-semibold">All TimeSheets</h1>
                 </div>
                   <div className="mt-4">
                   <AdminPageTimeSheet
                      timesheets={this.state.timesheets}
                      resetState={this.resetState}
                    />
                   </div>
              </main>
         </div>
         </>
    );
}
}

export default AdminPage_;