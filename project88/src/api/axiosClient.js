import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 5000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    },
})

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// axiosClient.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             // Token hết hạn hoặc không hợp lệ
//             localStorage.removeItem("token"); // Xóa token khỏi localStorage
//             window.location.href = "/login"; // Redirect về trang login
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;