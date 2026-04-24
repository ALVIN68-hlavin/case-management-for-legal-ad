import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getCases = () => API.get("/cases");

export const getCaseById = (id) => API.get(`/cases/${id}`);

export const updateCaseState = (id, nextState) =>
  API.patch(`/cases/${id}/state`, { nextState });

export const getCaseEvents = (id) =>
  API.get(`/cases/${id}/events`);

export const getDeadlines = (id) =>
  API.get(`/cases/${id}/deadlines`);