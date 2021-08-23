import React, { useState, ChangeEvent, FormEvent } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter, RouteComponentProps } from "react-router";
import Constants from './config'

interface PersonRecord{person_name: string, person_position: string, person_level: string}

const Create = (props:RouteComponentProps) => {
  const [stateObj, _objSet] = useState<PersonRecord>({ person_name: "", person_position: "", person_level: "" })
  const myStateRef = React.useRef(stateObj);

  const objSet = (data:PersonRecord) => {
    myStateRef.current = data;
    _objSet(data);
  };


  console.log("The initial state is " + JSON.stringify(stateObj))
  // componentWillMount(){
  //   console.log("Componenet is mounting")
  // }

  // componentWillUnmount(){
  //   console.log("Componenet is unommounting")
  // }
  // componentDidMount(){
  //   console.log("Componenet mounted")
  // }
  // componentDidUpdate(){
  //   console.log("Componenet updated")
  // }

  // These methods will update the state properties.
  function onChangePersonName(e:ChangeEvent<HTMLInputElement>) {
    console.log(" prev state: " + JSON.stringify(myStateRef.current));
    objSet({ ...myStateRef.current, person_name: e.target.value })
  }

  function onChangePersonPosition(e:ChangeEvent<HTMLInputElement>) {
    objSet({ ...myStateRef.current, person_position: e.target.value })
  }


  function onChangePersonLevel(e:ChangeEvent<HTMLInputElement>) {
    objSet({ ...myStateRef.current, person_level: e.target.value })
  }

  // This function will handle the submission.
  async function onSubmit(e:FormEvent) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: stateObj.person_name,
      person_position: stateObj.person_position,
      person_level: stateObj.person_level,

    };

    axios
      .post(`${Constants.SERVER_HOST}/record/add`, newperson)
      .then((res) => { console.log(res.data); });


    console.log("Timer begin")



    await new Promise(resolve => setTimeout(resolve, 1000));

    props.history.push("/");

    console.log("new person has been crated")


    // We will empty the state after posting the data to the database
    objSet({
      person_name: "",
      person_position: "",
      person_level: "",
    });



  }


  // This following section will display the form that takes the input from the user.
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name of the person: </label>
          <input
            type="text"
            className="form-control"
            value={stateObj.person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Person's position: </label>
          <input
            type="text"
            className="form-control"
            value={stateObj.person_position}
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
              checked={stateObj.person_level === "Intern"}
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
              checked={stateObj.person_level === "Junior"}
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
              checked={stateObj.person_level === "Senior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default withRouter(Create);