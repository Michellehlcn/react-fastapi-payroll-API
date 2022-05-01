import React, { useEffect, useState } from "react";

const PersonalInfor = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [am_pm_eve, setAm_pm_eve] = useState("");
  const [time, setTime] = useState("");
  const [campus, setCampus] = useState("");


  useEffect(() => {
    const getInfor = async () => {
      /*const requestOption = {
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
*/
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/form/my-timesheets`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the Timesheet Information");
      } else {
        const data = await response.json();
        setCourse(data.course);
        setSubject(data.subject);
        setDay(data.day);
        setAm_pm_eve(data.am_pm_eve);
        setTime(data.time);
        setCampus(data.campus);
        console.log(data);

      }
    };

    if (id) {
      getInfor();
    }
  }
  // eslint-disable-next-line
  , [id, token]);

  const cleanFormData = () => {
    setCourse("");
    setSubject("");
    setDay("");
    setAm_pm_eve("");
    setTime("");
    setCampus("");
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
        course: course,
        subject: subject,
        day: day,
        am_pm_eve: am_pm_eve,
        time: time,
        campus: campus,
      }),
    };
    const response = await fetch("/api/form/post-a-timesheet", requestOptions);
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
        course: course,
        subject: subject,
        day: day,
        am_pm_eve: am_pm_eve,
        time: time,
        campus: campus,

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
            {id ? "Update TimeSheet" : "Create TimeSheet"}
          </h1>
        </header>
        <section className="modal-card-body">

          <form>
            <div className="field">
              <label className="label">Course</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Select course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Choose Subject name"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="field">
              <label className="label">Day</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="choose date"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="input"
                  
                />
              </div>
            </div>

            
            <div className="field">
              <label className="label">AM/PM/EVE</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Choose AM/PM/EVE"
                  value={am_pm_eve}
                  onChange={(e) => setAm_pm_eve(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Time</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Select Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="field">
              <label className="label">Campus</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Choose campus"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="input"
                  required
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
