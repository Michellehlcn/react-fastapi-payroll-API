import React, { Component } from "react";
import { Table,
          Button,
          Modal, 
          ModalFooter,
          ModalHeader, 
          ModalBody } 
                          from "reactstrap";
// import TimeSheetModal from "./AdminPage.TimeSheetModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

// import Switch from "./shared/Switch";
import FastAPIClient from '../client';
import config from '../config';
import { useState } from "react";
import Switch from "react-switch";
const client = new FastAPIClient(config);

class AdminPageTimeSheet extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
            timesheets: [],
            modal: false,
            checked: false,
      
    }
    this.viewTS = this.viewTS.bind(this);
    this.deleteTS = this.deleteTS.bind(this);
    this.activateTS = this.activateTS.bind(this);
    this.deactivateTS = this.deactivateTS.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
activateTS = (id) =>{
  client.activateTimeSheet(id)
  .then(res =>
    console.log(res))
  .catch(err =>
    console.log(err))
}
deactivateTS = (id) =>{
  client.deactivateTimeSheet(id)
  .then(res =>
    console.log(res))
  .catch(err =>
    console.log(err))
}
toggle = () => {
  this.setState(previous => ({
    modal: !previous.modal,
   
  }));
}
handleToggle = (id) => {
  this.setState( 
    previous =>({
    checked: {
      ...previous.checked,
      [previous.checked[id]]:id.target.value},}));
  // if (checked === false) {
  //   this.activateTS(id);
  // } else {
  //   this.deactivateTS(id);
  // }
}

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
            <th>Status</th>
            <th></th>
            <th></th>
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
                <td>{timesheet.owner_id}</td>
                <td>{timesheet.campus}</td>
                <td>{timesheet.day}</td>
                <td>{timesheet.time}</td>
                <td>{String(timesheet.is_active)}</td>
                
                <td>
                {/* <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-thumbs-up" /></button> */}
                <button style={{marginLeft: "10px"}} onClick={this.toggle}><FontAwesomeIcon icon={faFilePen} size="lg" color="teal"/> </button>
                </td>
                
                <td>
                <button onClick={ () => this.deleteTS(timesheet.id)}><FontAwesomeIcon icon={faTrash} size="lg" color="red"/></button>
                </td>
                
                <td>
                {!timesheet.is_active ? (
                <Switch 
                  className="react-switch"
                  checked={this.state.checked} 
                  onChange= {() =>{this.handleToggle(!this.state.checked);this.activateTS(timesheet.id)} } />
                ):(
                <Switch 
                  className="react-switch"
                  checked={!this.state.checked}
                  onChange= {() =>{this.handleToggle(this.state.checked);this.deactivateTS(timesheet.id)}}  />)
                }
                </td>

                {/* Modal for Viewing timesheet */}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Timesheet View</ModalHeader>
                      <ModalBody>
                      <Table striped>
                              <tbody>
                                  <p>{timesheet.subject}</p>
                                  <p>{timesheet.owner_id}</p>
                                  <p>{timesheet.campus}</p>
                                  <p>{timesheet.day}</p>
                                  <p>{timesheet.time}</p>
                              </tbody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Do</Button>
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default AdminPageTimeSheet;