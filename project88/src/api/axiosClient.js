import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 5000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để tự động gắn token vào header Authorization
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Xử lý response lỗi 401 (token hết hạn hoặc không hợp lệ)
axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;