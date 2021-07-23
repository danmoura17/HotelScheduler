import axios, { AxiosResponse } from "axios";
import { Reservation } from "../models/reservation";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Reservations = {
  list: () => requests.get<Reservation[]>("/reservations"),
  details: (id: string) => requests.get<Reservation>(`/reservations/${id}`),
  create: (reservation: Reservation) => axios.post<void>('/reservations', reservation),
  update: (reservation: Reservation) =>  axios.put<void>(`/reservations/${reservation.id}`, reservation),
  delete: (id: string) => axios.delete<void>(`/reservations/${id}`)
};

const agent = {
  Reservations,
};

export default agent;
