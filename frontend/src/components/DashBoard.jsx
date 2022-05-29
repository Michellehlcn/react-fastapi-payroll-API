import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TimeSheetList from "./TimeSheetList";
import TimeSheetForm from "./TimeSheetForm";
import { TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FastAPIClient from '../client';
import config from '../config';

const client = new FastAPIClient(config);
class DashBoard extends Component {
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
      <Container style={{ marginTop: "20px" }}>
        
            <Paper elevation={2} style={{ marginTop: "20px", padding: '15px' }}>
                <Row>
                  <Col>
                    <TimeSheetForm />
                  </Col>
                </Row>
            </Paper>
            <Paper elevation={2} style={{ marginTop: "20px", padding: '15px' }}>
                <Row>
                  <Col>
                    <TimeSheetList
                      timesheets={this.state.timesheets}
                      resetState={this.resetState}
                    />
                  </Col>
                </Row>
              </Paper>
      </Container>
    );
  }
}

export default DashBoard;