import { createStore } from "redux";
import EmployeeReducer from "../reducers/employeeReducer";

const store = createStore(EmployeeReducer);
export default store;