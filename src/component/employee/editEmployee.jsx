import React, { Component } from "react";
import "./employee.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { UPDATE_EMPLOYEE } from "../../actions/constants";

// DatePicker section
import DatePicker from "antd/lib/date-picker";
import "antd/lib/date-picker/style/css";

// Dialog box section
import Dialog from "react-dialog";
import "react-dialog/css/index.css";

import moment from "moment";

class EditEmployee extends Component {
  constructor() {
    super();

    this.state = {
      isDialogOpen: false,
      isCancelDialog: false,
      name: "",
      designation: "",
      dateOfJoining: "",
      age: ""
    };
  }

  handleUpdateEmployee = e => {
    e.preventDefault();

    if (
      this.props.employee.name === e.target.name.value &&
      this.props.employee.designation === e.target.designation.value &&
      this.props.employee.dateOfJoining === e.target.dateOfJoining.value &&
      this.props.employee.age === e.target.age.value
    ) {
      this.openDialog();
      return true;
    }

    this.props.dispatch({
      type: UPDATE_EMPLOYEE,
      data: {
        name: e.target.name.value,
        designation: e.target.designation.value,
        dateOfJoining: e.target.dateOfJoining.value,
        age: e.target.age.value,
        id: this.props.employee.id
      }
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

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  openCancelDialog = e => {
    if (
      this.props.employee.name === this.refs.name.value &&
      this.props.employee.designation === this.refs.designation.value &&
      this.props.employee.dateOfJoining === this.refs.dateOfJoining.value &&
      this.props.employee.age === this.refs.age.value
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
    const dateFormat = "YYYY-MM-DD";
    return (
      <div>
        <h1>Edit Employee</h1>
        <div>
          <form onSubmit={this.handleUpdateEmployee}>
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
                      ref="name"
                      required
                      defaultValue={this.props.employee.name}
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
                      ref="designation"
                      required
                      defaultValue={this.props.employee.designation}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Date of Joining: </label>
                  </td>
                  <td>
                    <DatePicker
                      name="dateOfJoining"
                      ref="dateOfJoining"
                      defaultValue={moment(
                        this.props.employee.dateOfJoining,
                        dateFormat
                      )}
                      onChange={this.onChange}
                    />
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
                      ref="age"
                      required
                      defaultValue={this.props.employee.age}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button type="submit" name="save">
                      Update
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
        <Link to="/"> Back to list </Link>
        <div className="container">
          {this.state.isDialogOpen && (
            <Dialog
              modal={true}
              onClose={this.handleClose}
              buttons={[
                {
                  text: "OK",
                  onClick: () => this.handleClose()
                }
              ]}
            >
              <p>No changes to Save</p>
            </Dialog>
          )}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employee: state.selectedEmployee[0]
  };
}

export default connect(mapStateToProps)(EditEmployee);
