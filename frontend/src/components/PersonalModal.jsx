import React, { useEffect, useState } from "react";

const PersonalInfor = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPosition, setTitle] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    const getInfor = async () => {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response1 = await fetch("/api/users/me", requestOption);
      const data1 = await response1.json();
      const id = data1.id;
      console.log(data1);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/profile`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the Your Information");
      } else {
        const data = await response.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setTitle(data.title);
        setPrimaryPhone(data.primary_phone_number);
        setSecondaryPhone(data.secondary_phone_number);
        setEmail(data.email_address);

      }
    };

    if (id) {
      getInfor();
    }
  }
  // eslint-disable-next-line
  , [id, token]);

  const cleanFormData = () => {
    setFirstName("");
    setLastName("");
    setTitle("");
    setPrimaryPhone("");
    setSecondaryPhone("");
    setEmail("");
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        title: currentPosition,
        primary_phone_number: primaryPhone,
        secondary_phone_number: secondaryPhone,
        email_address: email,
      }),
    };
    const response = await fetch("/api/profile", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating form");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        title: currentPosition,
        primary_phone_number: primaryPhone,
        secondary_phone_number: secondaryPhone,
        email_address: email,

      }),
    };
    const response = await fetch(`/api/profile/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating form");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Update Profiles" : "Create Profiles"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Current Position</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={currentPosition}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Primary Phone Number</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter number"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Secondary Phone Number</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter number"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>


          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateLead}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateLead}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PersonalInfor;
