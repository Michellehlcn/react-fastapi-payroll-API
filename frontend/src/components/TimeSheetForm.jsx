import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import PersonalInfor from "./TimeSheet";
import { UserContext } from "../context/UserContext";

import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';

const useStyles = makeStyles({
    root: {
      /*background: '#fff',*/
      width: '100%',

      padding: '8px',
      position: 'relative',
      display: 'flex',
       'align-items': 'center',
        'justify-content': 'center',
        'margin-top': '50px',
    },
    button: {
        /*background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',*/
        width:'50%',
        //position: 'absolute',
        //top: '70%',
    },
    input: {
        width: '100%',
        'padding-bottom': '8px'
    }
});
const TimeSheetForm = () => {
  const classes = useStyles();
  const [token] = useContext(UserContext);
  const [timesheets, setInfor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);



  const getId = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/users/me`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the Profiles");
    } else {
      const data = await response.json();
      setId(data.id);
      console.log(data)
      
    }
  };


  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };


  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/profile/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to delete profiles");
    }

    getInfor();
  };

  const getInfor = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/profile/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the Profiles");
    } else {
      const data = await response.json();
      setInfor(data);
      setLoaded(true);
      console.log(data)
      
    }
  };

  useEffect(() => {
    getInfor();
    // eslint-disable-next-line
  }, []);

  const handleModal = () => {
    getId();
    setActiveModal(!activeModal);
    getInfor();
    setId();
  };
  

  return (
    <>
  <Grid container direction="row" justify="center" alignItems="center" >
    <Paper className={classes.root} elevation={6}>
    <Container>
        <Row>
          <Col md="2">
            <h3> Log a Timesheet</h3>
            <hr />
              <PersonalInfor
                active={activeModal}
                handleModal={handleModal}
                token={token}
                id={id}
                setErrorMessage={setErrorMessage}
              />
              <button
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => setActiveModal(true)}
              >
                Create TimeSheet
              </button>
            </Col>

            <Col md="1"></Col>
            <Col md="9">
              <h3> Timesheet History</h3>
              <hr />
                  <ErrorMessage message={errorMessage} />
                  {loaded && timesheets ? (
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Campus</th>
                          <th>Day</th>
                          <th>AM/PM/EVE</th>
                          <th>Time</th>
                          <th>Course</th>
                          <th>Group</th>
                          <th>ZoomID</th>
                          <th>ZoomPassWord</th>
                          <th>ZoomLink</th>
                          <th>Room Number</th>
                          <th>Classroom Capacity</th>
                          <th>No of Students</th>
                          <th>Student Profile</th>
                          <th>Class Size</th>
                          <th>Unique Group</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timesheets.map((e) => (
                          <tr key={id}>
                            <td>{e.subject}</td>
                            <td>{e.campus}</td>
                            <td>{e.day}</td>
                            <td>{e.am_pm_eve}</td>
                            <td>{e.time}</td>
                            <td>{e.course}</td>
                            <td>{e.group}</td>
                            <td>{e.zoom_id_for_trainer}</td>
                            <td>{e.zoom_password_for_trainer}</td>
                            <td>{e.zoom_link_for_students}</td>
                            <td>{e.campus_room_no_capacity}</td>
                            <td>{e.classrom_capacity}</td>
                            <td>{e.number_of_student}</td>
                            <td>{e.student_profile}</td>
                            <td>{e.class_size_utilization}</td>
                            <td>{e.unique_group}</td>
                            <td>{moment(e.created_at).format("MMM Do YY")}</td>
                            <td>
                              <button
                                className="button mr-2 is-info "
                                onClick={() => handleUpdate(e.id)}
                              >
                                Update
                              </button>
                              <button
                                className="button mr-2 is-danger "
                                onClick={() => handleDelete(e.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Loading</p>
                  )}
          </Col>
        </Row>
      </Container>
  </Paper>
</Grid>
    </>
  );
};

export default TimeSheetForm;
