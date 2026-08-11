import axios from "axios";

const API =axios.create({
    baseURL:"https://employeemanagementssystem-mern-stack.onrender.com/api",
});

export default API;