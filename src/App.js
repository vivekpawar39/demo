import React, { Component } from "react";
import "./App.css";

import EmployeeList from "./component/employee/employeeList";
import AddEmployee from "./component/employee/addEmployee";
import EditEmployee from "./component/employee/editEmployee";

import { Route, BrowserRouter } from "react-router-dom";

import store from "./store/store";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route path="/" exact component={EmployeeList} />
            <Route path="/add" exact component={AddEmployee} />
            <Route path="/edit/:id" exact component={EditEmployee} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
