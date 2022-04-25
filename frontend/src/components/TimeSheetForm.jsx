import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import PersonalInfor from "./TimeSheet";
import { UserContext } from "../context/UserContext";

const TimeSheetForm = () => {
  const [token] = useContext(UserContext);
  const [employees, setInfor] = useState(null);
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
      <ErrorMessage message={errorMessage} />
      {loaded && employees ? (
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
            {employees.map((e) => (
              <tr key={id}>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td>{e.title}</td>
                <td>{e.primary_phone_number}</td>
                <td>{e.secondary_phone_number}</td>
                <td>{e.email}</td>
                <td>{moment(e.created_at).format("MMM Do YY")}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => handleUpdate(e.id)}
                  >
                    Update
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
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
    </>
  );
};

export default TimeSheetForm;
