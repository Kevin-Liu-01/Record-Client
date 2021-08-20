import React, { useEffect, useState } from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";
import Constants from './config.js'


const Edit = (props) => {
  // This is the constructor that stores the data.
  console.log("The constructor in edit is called")
  const [person_name, setName] = useState("")
  const [person_position, setPosition] = useState("")
  const [person_level, setLevel] = useState("")
  const [records, setRecords] = useState([])

  // This will get the record based on the id from the database.
  useEffect(() => {
    console.log("USEFFECT CALLED")
    axios
      .get(`${Constants.SERVER_HOST}/record/${props.match.params.id}`)
      .then((response) => (
        console.log(`${Constants.SERVER_HOST}/record/${props.match.params.id}`),
        setName(response.data.person_name),
        setPosition(response.data.person_position),
        setLevel(response.data.person_level))
      ).catch(function (error) {
        console.log(error);
      })
  }, [])

  // These methods will update the state properties.
  function onChangePersonName(eb) {
    console.log(eb.target.value)
    if (eb.target.value.length < 13) {
      setName(eb.target.value)
    }

    if (eb.target.value.length === 12) {
      console.log("you cannot add anymore")
    }
  }

  function onChangePersonPosition(e) {
    setPosition(e.target.value)

  }

  function onChangePersonLevel(e) {
    setLevel(e.target.value)

  }

  // This function will handle the submission.
  function onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {

      person_name: person_name,
      person_position: person_position,
      person_level: person_level,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post(
        `${Constants.SERVER_HOST}/update/${props.match.params.id}`,
        newEditedperson
      )
      .then((res) => {console.log(res.data);  props.history.push("/");});

   
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  console.log("COOMPONENT RENDERED")

  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            value={person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
          <input
            type="text"
            className="form-control"
            value={person_position}
            onChange={onChangePersonPosition}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={person_level === "Intern"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={person_level === "Junior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={person_level === "Senior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );

}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
