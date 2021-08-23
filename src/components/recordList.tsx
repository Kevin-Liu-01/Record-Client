import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link} from "react-router-dom";
import Constants from './config'


const Record = (props: any) => (
  <tr>
    <td>{props.record.person_name}</td>
    <td>{props.record.person_position}</td>
    <td>{props.record.person_level}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);
interface PersonRecordDB{
  _id: string, 
  person_name: string, 
  person_level: string, 
  person_position: string
}

interface RecordListState{records:PersonRecordDB[]}


export default class RecordList extends Component< any, RecordListState> {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props:any) {
    console.log("The constructor in recordlist is called")

    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    // debugger;
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get(`${Constants.SERVER_HOST}/record/`)
      .then((response) => {
        console.log(`/record/ returned response from: ${Constants.SERVER_HOST}/record/`)
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  async deleteRecord(id:string) {
    // axios.delete(`${Constants.SERVER_HOST}/${id}`).then((response) => {
    //   console.log(response.data);
    // });

    axios.post(`${Constants.SERVER_HOST}/delete/${id}`).then((response) => {
      console.log(response.data);
    });

    console.log("Deleterecord is called")
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setState({
      records: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        <h3>Record List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}
