import React, { Component } from "react";
import "./employee.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ADD_EMPLOYEE } from "../../actions/constants";

// DatePicker section
import DatePicker from "antd/lib/date-picker";
import "antd/lib/date-picker/style/css";

// Dialog box section
import Dialog from "react-dialog";
import "react-dialog/css/index.css";

class AddEmployee extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      designation: "",
      dateOfJoining: "",
      age: "",
      isCancelDialog: false
    };
  }

  handleAddEmployee = e => {
    e.preventDefault();
    this.props.dispatch({
      type: ADD_EMPLOYEE,
      data: this.state
    });
    this.props.history.push("/");
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChange = (date, dateString) => {
    this.setState({
      dateOfJoining: dateString
    });
  };

  openCancelDialog = e => {
    if (
      !this.state.name &&
      !this.state.designation &&
      !this.state.dateOfJoining &&
      !this.state.age
    ) {
      this.props.history.push("/");
    } else {
      this.setState({ isCancelDialog: true });
    }
  };

  handleNoButton = () => this.setState({ isCancelDialog: false });

  handleYesButton = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <div>
          <form onSubmit={this.handleAddEmployee}>
            <table align="center" style={{ border: "0px" }}>
              <tbody>
                <tr>
                  <td>
                    <label>Name: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      required
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Designation: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="designation"
                      required
                      value={this.state.designation}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Date of Joining: </label>
                  </td>
                  <td>
                    <DatePicker onChange={this.onChange} required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Age: </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="age"
                      min="18"
                      max="70"
                      required
                      value={this.state.age}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button type="submit" name="save">
                      Save
                    </button>
                    &nbsp; &nbsp;
                    <button type="button" onClick={this.openCancelDialog}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="container">
          {this.state.isCancelDialog && (
            <Dialog
              modal={true}
              onClose={this.handleNoButton}
              buttons={[
                {
                  text: "Yes",
                  onClick: () => this.handleYesButton()
                },
                {
                  text: "No",
                  onClick: () => this.handleNoButton()
                }
              ]}
            >
              <p>Your changes will be discarded</p>
            </Dialog>
          )}
        </div>
        <Link to=""> Back to list </Link>
      </div>
    );
  }
}

export default connect()(AddEmployee);
