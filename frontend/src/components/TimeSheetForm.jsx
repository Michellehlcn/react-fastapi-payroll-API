import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import FastAPIClient from '../client';
import config from '../config';

const client = new FastAPIClient(config);
const TimeSheetForm = () => {
  const [error, setError] = useState({ subject: '', course: '', campus: '', day: '', am_pm_eve: '', time: '', group: ''});
  const [timesheet, setTimesheet] = useState({ subject: '', course: '', campus: '', day: '', am_pm_eve: '', time: '', group: ''});
  
  const onTimesheet = (e) => {
    e.preventDefault();
    setError(false);
  
    client.createTimeSheet(timesheet.subject, timesheet.campus, timesheet.day, timesheet.am_pm_eve, timesheet.time, timesheet.course, timesheet.group)
    .then( () => {
      console.log('successfully create timesheet!')
    })
    .catch( (err) => {
      console.log(err);
      setError(true);
      alert(err)
  });
}
  // state = {
  //   id: "",
  //   name: "",
  //   email: "",
  //   document: "",
  //   phone: ""
  // };

  // componentDidMount() {
  //     const { id, name, document, email, phone } = this.props.timesheet;
  //     this.setState({ id, name, document, email, phone });
  //   };
  

  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // createTimeSheet = e => {
  //   e.preventDefault();
  //   client.createTimeSheet(this.state).then(() => {
  //     this.props.resetState();
  //     this.props.toggle();
  //   });
  // };

  // editTimeSheet = e => {
  //   e.preventDefault();
  //   client.editTimeSheet(this.state).then(() => {
  //     this.props.resetState();
  //     this.props.toggle();
  //   });
  // };

  // defaultIfEmpty = value => {
  //   return value === "" ? "" : value;
  //};

 
    return (
<Form id="myform" onSubmit={(e) =>onTimesheet(e)}>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="Subject">
        Subject
        </Label>
        <Input
          id="Subject"
          placeholder="Select Subject"
          type="select"
          error={error.subject}
          value={timesheet.subject}
          onChange={(e) => setTimesheet({...timesheet, subject: e.target.value })}
          required
        >
          <option></option>
          <option>Nurturing Children</option>
          <option>Curriculm Design</option>
          <option>Health Science A (1-3T)</option>
          <option>Massage Clinic C</option>
          <option>Leadership in Early Childhood Education</option>
          <option>Diverse Clients</option>
          <option>Counselling Specialisation</option>
          <option>The Yoga Business</option>
          <option>Healthy Bodies Theory</option>
          <option>Cycle A Theory </option>
          <option>Advanced Personal Training(Theory+Practical)</option>
          <option>Human Resource Management</option>
        </Input>
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="Course">
        Course
        </Label>
        <Input
          id="Course"
          placeholder="Select course"
          type="select"
          error={error.course}
          value={timesheet.course}
          onChange={(e) => setTimesheet({...timesheet, course: e.target.value })}
          required
        >
          <option></option>
          <option>CIII ECEC(OLD)</option>
          <option>DIP ECEC(OLD)</option>
          <option>CIV Massage</option>
          <option>DIP Massage</option>
          <option>DIP ECEC(NEW)</option>
          <option>DIP CNSL/CS/MH</option>
          <option>DIP CNSL</option>
          <option>DIP ECEC(OLD)</option>
          <option>CIV YOGA</option>
          <option>CIV FIT</option>
          <option>DRSM FIT</option>
        </Input>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col md={4}>
      <FormGroup>
        <Label for="Campus">
        Campus
        </Label>
        <Input
          id="Campus"
          placeholder="Select campus"
          className="mb-3"
          type="select"
          error={error.campus}
          value={timesheet.campus}
          onChange={(e) => setTimesheet({...timesheet, campus: e.target.value })}
        >
          <option></option>
          <option>SYDNEY</option>
          <option>MELBOURNE</option>
          <option>BRISBANE</option>
          <option>PERTH</option>
        </Input>
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="Day">
        Day
        </Label>
        <Input
          id="Day"
          placeholder="Select day"
          type="select"
          error={error.day}
          value={timesheet.day}
          onChange={(e) => setTimesheet({...timesheet, day: e.target.value })}
          required
        >
          <option></option>
          <option>MONDAY</option>
          <option>TUESDAY</option>
          <option>WEDNESDAY</option>
          <option>THURSDAY</option>
          <option>FRIDAY</option>
      </Input>
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="am_pm_eve">
        AM/PM/EVE
        </Label>
        <Input
          id="am_pm_eve"
          placeholder=""
          type="select"
          error={error.am_pm_eve}
          value={timesheet.am_pm_eve}
          onChange={(e) => setTimesheet({...timesheet, am_pm_eve: e.target.value })}
          required
          >
          <option></option>
          <option>AM</option>
          <option>PM</option>
          <option>EVE</option>

        </Input>
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="time">
          Time
        </Label>
        <Input
          id="time"
          placeholder=""
          type="text"
          error={error.time}
          value={timesheet.time}
          onChange={(e) => setTimesheet({...timesheet, time: e.target.value })}
          required
          />

      </FormGroup>
    </Col>
  </Row>
  <FormGroup>
    <Label for="group">
      Group
    </Label>
    <Input
      id="group"
      placeholder="Select group"
      type="text"
      error={error.group}
      value={timesheet.group}
      onChange={(e) => setTimesheet({...timesheet, group: e.target.value })}

    />
  </FormGroup>


  
  <Button>
    Lodge Timesheet
  </Button>
</Form>
      // <Form onSubmit={this.props.timesheet ? this.editTimeSheet : this.createTimeSheet}>
      //   <FormGroup>
      //     <Label for="name">Name:</Label>
      //     <Input
      //       type="text"
      //       name="name"
      //       onChange={this.onChange}
      //       value={this.defaultIfEmpty(this.state.name)}
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <Label for="email">Email:</Label>
      //     <Input
      //       type="email"
      //       name="email"
      //       onChange={this.onChange}
      //       value={this.defaultIfEmpty(this.state.email)}
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <Label for="document">Document:</Label>
      //     <Input
      //       type="text"
      //       name="document"
      //       onChange={this.onChange}
      //       value={this.defaultIfEmpty(this.state.document)}
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <Label for="phone">Phone:</Label>
      //     <Input
      //       type="text"
      //       name="phone"
      //       onChange={this.onChange}
      //       value={this.defaultIfEmpty(this.state.phone)}
      //     />
      //   </FormGroup>
      //   <Button>Send</Button>
      // </Form>
   
    );
};

export default TimeSheetForm;

