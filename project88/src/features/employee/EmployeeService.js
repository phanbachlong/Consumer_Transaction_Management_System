import employeeAPI from "../../api/EmployeeAPI";
import { getEmployeeByUsername } from "../../redux/slices/employeeSlice";

const EmployeeService = {
    getAllEmployees: async (page, size, filter) => {
        return await employeeAPI.getAllEmployees(page, size, filter);
    },
    getEmployeeByUsername: async () => {
        return await employeeAPI.getEmployeeByUsername();
    }
}

export default EmployeeService;