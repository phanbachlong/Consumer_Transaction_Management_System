import employeeAPI from "../../api/EmployeeAPI";

const EmployeeService = {
    getAllEmployees: async (page, size, filter) => {
        return await employeeAPI.getAllEmployees(page, size, filter);
    }
}

export default EmployeeService;