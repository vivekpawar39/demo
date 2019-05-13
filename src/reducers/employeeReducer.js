import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from "../actions/constants";

const initialState = {
  employees: [],
  selectedEmployee: []
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      if (state.employees && state.employees.length > 0) {
        var employees = state.employees;
        var lastEmployee = employees[state.employees.length - 1];
        var newEmployeeId = lastEmployee.id + 1;
        action.data.id = newEmployeeId;
      } else {
        action.data.id = 0;
      }

      return {
        employees: state.employees.concat([action.data])
      };

    case EDIT_EMPLOYEE:
      return {
        employees: state.employees,
        selectedEmployee: state.employees.filter(
          employee => employee.id === action.data
        )
      };

    case DELETE_EMPLOYEE:
      return {
        employees: state.employees.filter(
          employee => employee.id !== action.data
        )
      };

    case UPDATE_EMPLOYEE:
      var oldData = state.employees;
      for (let i = 0; i < oldData.length; i++) {
        if (oldData[i].id === action.data.id) {
          oldData[i].name = action.data.name;
          oldData[i].designation = action.data.designation;
          oldData[i].dateOfJoining = action.data.dateOfJoining;
          oldData[i].age = action.data.age;
        }
      }

      return {
        selectedEmployee: state.selectedEmployee,
        employees: oldData
      };

    default:
      return state;
  }
};

export default EmployeeReducer;
