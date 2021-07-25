import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Reservation } from "../models/reservation";
import {format} from 'date-fns'


export default class ReservationStore {
  reservertionRegistry = new Map<string, Reservation>();
  selectedReservation: Reservation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get reservationsByDate() {
    return Array.from(this.reservertionRegistry.values()).sort(
      (a, b) => a.checkinDate!.getTime() - b.checkinDate!.getTime()
    );
  }

  get groupedReservations () {
    return Object.entries(
      this.reservationsByDate.reduce((reservations, reservation)=>{
        const date = format(reservation.checkinDate!, 'dd MMMM yyyy');
        reservations[date] = reservations[date] ? [...reservations[date], reservation] : [reservation];
        return reservations;
      }, {} as {[key: string]: Reservation[]}) 
    )
  }

  loadReservations = async () => {
    this.loadingInitial = true;
    try {
      const reservations = await agent.Reservations.list();
      reservations.forEach((reservation) => {
        this.setReservation(reservation);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadReservation = async (id: string) => {
    let reservation = this.getReservation(id);
    if (reservation) {
      this.selectedReservation = reservation;
      return reservation;
    } else {
      this.loadingInitial = true;
      try {
        reservation = await agent.Reservations.details(id);
        this.setReservation(reservation);
        runInAction(()=>{
          this.selectedReservation = reservation;
        })
        this.setLoadingInitial(false);
        return reservation;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setReservation = (reservation: Reservation) => {
    reservation.reservationDate = new Date(reservation.reservationDate!);
    reservation.checkinDate = new Date(reservation.checkinDate!);
    reservation.checkoutDate = new Date(reservation.checkoutDate!);
    this.reservertionRegistry.set(reservation.id, reservation);
  };

  private getReservation = (id: string) => {
    return this.reservertionRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createReservation = async (reservation: Reservation) => {
    this.loading = true;
    try {
      await agent.Reservations.create(reservation);
      runInAction(() => {
        this.reservertionRegistry.set(reservation.id, reservation);
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
        this.reservertionRegistry.set(reservation.id, reservation);
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
