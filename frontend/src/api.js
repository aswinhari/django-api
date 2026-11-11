import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

export const getTasks = (status = "") => {
    const params = status ? { status } : {};
    return API.get("tasks/", { params });
};

export const addTask = (task) => {
    return API.post("tasks/", task);
};

export const updateTask = (id, task) => {
    return API.patch(`tasks/${id}/`, task);
};

export const deleteTask = (id) => {
    return API.delete(`tasks/${id}/`);
};

export const getStats = () => {
    return API.get("tasks/stats/");
};