import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Reservation } from "../models/reservation";

export default class ReservationStore {
  reservations: Reservation[] = [];
  selectedReservation: Reservation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadReservations = async () => {
    this.setLoadingInitial(true)

    try {
      const reservations = await agent.Reservations.list();

        reservations.forEach((reservation) => {
            reservation.reservationDate = reservation.reservationDate.split("T")[0];
            reservation.checkinDate = reservation.checkinDate.split("T")[0];
            reservation.checkoutDate = reservation.checkoutDate.split("T")[0];
            this.reservations.push(reservation);
          });
          this.setLoadingInitial(false)
     
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false)
      
    }
  };

  setLoadingInitial = (state: boolean) => {
      this.loadingInitial = state;
  }

  selectReservation = (id: string) => {
      this.selectedReservation = this.reservations.find(a => a.id === id)
  }

  cancelSelectedReservation = () => {
      this.selectedReservation = undefined
  }

  openForm = (id?: string) => {
      id ? this.selectReservation(id) : this.cancelSelectedReservation();
      this.editMode = true;
  }

  closeForm = () => {
      this.editMode = false
  }

}
