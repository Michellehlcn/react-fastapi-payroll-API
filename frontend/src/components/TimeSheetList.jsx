import React, { Component } from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';

import FastAPIClient from '../client';
import config from '../config';
const client = new FastAPIClient(config);

class TimeSheetList extends Component {
  constructor(props) {
    super(props)

    this.state = {
            timesheets: []
    }
    this.viewTS = this.viewTS.bind(this);
    this.deleteTS = this.deleteTS.bind(this);
}
deleteTS =(id) =>{
  client.deleteTimeSheet(id)
  .then(res => 
    console.log(res))
  .catch(err =>
    console.log(err))
}

viewTS =(id) =>{
  client.viewTimeSheet(id)
  .then(res => 
    console.log(res))
  .catch(err =>
    console.log(err))
}

// editEmployee(id){
//   this.props.history.push(`/add-employee/${id}`);
// }

// viewEmployee(id){
//   this.props.history.push(`/view-employee/${id}`);
// }
  render() {
    const timesheets = this.props.timesheets;
    return (
      
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>TrainerID</th>
            <th>Campus</th>
            <th>Day</th>
            <th>Time</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!timesheets || timesheets.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            timesheets.map(timesheet => (
              <tr key={timesheet.id}>
                <td>{timesheet.subject}</td>
                <td>{timesheet.owner_id}</td>
                <td>{timesheet.campus}</td>
                <td>{timesheet.day}</td>
                <td>{timesheet.time}</td>
                <td>{timesheet.course}</td>
                <td>{String(timesheet.is_active)}</td>
                <td>
                {/* <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-thumbs-up" /></button> */}
                <button style={{marginLeft: "10px"}} onClick={ () => this.viewTS(timesheet.id)}><FontAwesomeIcon icon={faFilePen} size="lg" color="teal"/> </button>
                <button onClick={ () => this.deleteTS(timesheet.id)}><FontAwesomeIcon icon={faTrash} size="lg" color="red"/></button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default TimeSheetList;