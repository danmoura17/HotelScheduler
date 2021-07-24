import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Reservation } from "../models/reservation";
import { v4 as uuid } from "uuid";

export default class ReservationStore {
  reservertionRegistry = new Map<string, Reservation>();
  selectedReservation: Reservation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get reservationsByDate() {
      return Array.from(this.reservertionRegistry.values()).sort((a, b) => 
      Date.parse(a.reservationDate) - Date.parse(b.reservationDate));
  }

  loadReservations = async () => {
    try {
      const reservations = await agent.Reservations.list();
      reservations.forEach((reservation) => {
        reservation.reservationDate = reservation.reservationDate.split("T")[0];
        reservation.checkinDate = reservation.checkinDate.split("T")[0];
        reservation.checkoutDate = reservation.checkoutDate.split("T")[0];
        this.reservertionRegistry.set(reservation.id, reservation)
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectReservation = (id: string) => {
    this.selectedReservation = this.reservertionRegistry.get(id)
  };

  cancelSelectedReservation = () => {
    this.selectedReservation = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectReservation(id) : this.cancelSelectedReservation();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createReservation = async (reservation: Reservation) => {
    this.loading = true;
    reservation.id = uuid();
    try {
      await agent.Reservations.create(reservation);
      runInAction(() => {
        this.reservertionRegistry.set(reservation.id, reservation)
        this.selectedReservation = reservation;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateReservation = async (reservation: Reservation) => {
    this.loading = true;
    try {
      await agent.Reservations.update(reservation);
      runInAction(() => {
        this.reservertionRegistry.set(reservation.id, reservation)
        this.selectedReservation = reservation;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteReservation = async (id: string) => {
    this.loading = true;
    try {
      await agent.Reservations.delete(id);
      runInAction(() => {
        this.reservertionRegistry.delete(id);
        if (this.selectedReservation?.id === id)
          this.cancelSelectedReservation();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
