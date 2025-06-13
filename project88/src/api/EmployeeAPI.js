import api from "./axiosClient";

const url = '/employees';

const getAllEmployees = (page, size, filter) => {
    return api.get(url, {
        params: {
            page,
            size,
            ...filter
        }
    })
}

const getEmployeeByUsername = () => {
    return api.get(`/users/profile`);
}

const employeeAPI = {
    getAllEmployees,
    getEmployeeByUsername
}

export default employeeAPI;