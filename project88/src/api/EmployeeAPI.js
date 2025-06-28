import api from "./axiosClient";


const getAllEmployees = (page, size, filter) => {
    return api.get('/admin', {
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

const createEmployee = (body) => {
    return api.post('/admin/create-employee', body);
}

const employeeAPI = {
    getAllEmployees,
    getEmployeeByUsername,
    createEmployee
}

export default employeeAPI;