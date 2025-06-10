import api from "./axiosClient";

const url = '/employees';

const getAllEmployees = (page, size, filter) => {
    return api.get(url, { params: page, size, ...filter })
}

const employeeAPI = {
    getAllEmployees
}

export default employeeAPI;