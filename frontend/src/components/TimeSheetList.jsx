import React, { Component } from "react";
import { Table } from "reactstrap";

class TimeSheetList extends Component {
  render() {
    const timesheets = this.props.timesheets;
    return (
      
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Campus</th>
            <th>Day</th>
            <th>Time</th>
            <th>Course</th>
            <th></th>
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
                <td>{timesheet.campus}</td>
                <td>{timesheet.day}</td>
                <td>{timesheet.time}</td>
                <td>{timesheet.course}</td>
                <td align="center">

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