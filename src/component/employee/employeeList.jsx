import React, { Component } from "react";
import "./employee.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { EDIT_EMPLOYEE, DELETE_EMPLOYEE } from "../../actions/constants";

import moment from "moment";

class EmployeeList extends Component {
  handleEditEmployee = employeeId => {
    this.props.dispatch({
      type: EDIT_EMPLOYEE,
      data: employeeId
    });

    this.props.history.push("/edit/" + employeeId);
  };

  handleRemoveEmployee = employeeId => {
    this.props.dispatch({
      type: DELETE_EMPLOYEE,
      data: employeeId
    });
  };

  render() {
    return (
      <div>
        <h1>Employee List</h1>
        <table align="center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map(function(employee, index) {
              return (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>
                    {moment(new Date(employee.dateOfJoining)).format("ll")}
                  </td>
                  <td>{employee.age}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.handleEditEmployee.bind(this, employee.id)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      type="button"
                      onClick={this.handleRemoveEmployee.bind(
                        this,
                        employee.id
                      )}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }, this)}
          </tbody>
        </table>
        <div className="addEmployee">
          <Link to="add"> Add New Employee </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees
  };
}

export default connect(mapStateToProps)(EmployeeList);
