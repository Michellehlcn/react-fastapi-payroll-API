import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from "./ErrorMessage";
import PersonalInfor from "./PersonalModal";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles({
    root: {
      /*background: '#fff',*/
      width: '100%',

      padding: '8px',
      position: 'relative',
      display: 'flex',
       'align-items': 'center',
        'justify-content': 'center',
      'margin-top': '100px',
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

const Table = () => {
  const classes = useStyles();
  const [token] = useContext(UserContext);
  const [trainers, setInfor] = useState(null);
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
      setErrorMessage("Something went wrong. Couldn't load the Your Profiles");
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

  const getInfor = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/profile`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the Profiles");
    } else {
      const data = await response.json();
      setInfor(data);
      setLoaded(true);

      
    }
  };

  useEffect(() => {
    getId();
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
              >Profiles
              </button>
          </Col>
          <Col md="1"></Col>

          <Col md="9">
                <ErrorMessage message={errorMessage} />
                {loaded && trainers ? (
                  <table className="table is-fullwidth">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Current Position</th>
                        <th>Primary Phone Number</th>
                        <th>Secondary Phone Number</th>
                        <th>Email</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((e) => (
                        <tr key={e.id}>
                          <td>{e.first_name}</td>
                          <td>{e.last_name}</td>
                          <td>{e.title}</td>
                          <td>{e.primary_phone_number}</td>
                          <td>{e.secondary_phone_number}</td>
                          <td>{e.email}</td>
                          <td>{moment(e.created_at).format("MMM Do YY")}</td>
                          <td>
                            <button
                              className="button mr-2 is-info "
                              onClick={() => handleUpdate(e.id)}
                            >
                              Update
                            </button> |
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

export default Table;
