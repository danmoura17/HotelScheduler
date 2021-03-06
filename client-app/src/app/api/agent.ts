import { UserFormValues } from './../models/user';
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Reservation } from "../models/reservation";
import { User } from "../models/user";
import { store } from "../stores/store";
import { request } from 'http';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if(typeof data === 'string') {
          toast.error(data)
        }
        if(config.method === 'get' && data.errors.hasOwnProperty('id')){
          history.push('/not-found')
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unouthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error')
        break;
    }
    return Promise.reject(error);
  }
);

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
  create: (reservation: Reservation) =>
    axios.post<void>("/reservations", reservation),
  update: (reservation: Reservation) =>
    axios.put<void>(`/reservations/${reservation.id}`, reservation),
  delete: (id: string) => axios.delete<void>(`/reservations/${id}`),
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
  Reservations,
  Account
};

export default agent;
