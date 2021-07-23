import { useState, useEffect } from "react";
import { ExampleComponent } from "../../ExampleCompontent";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";
import ReservationDashboard from "../features/dashboard/ReservationDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<
    Reservation | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Reservation[]>("http://localhost:5000/api/reservations")
      .then((response) => {
        setReservations(response.data);
      });
  }, []);

  function handleSelectReservation(id: string) {
    setSelectedReservation(reservations.find((x) => x.id === id));
  }

  function handleCancelSelectReservation() {
    setSelectedReservation(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectReservation(id) : handleCancelSelectReservation();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditReservation(reservation: Reservation) {
    reservation.id
      ? setReservations([
          ...reservations.filter((x) => x.id !== reservation.id),
          reservation,
        ])
      : setReservations([...reservations, {...reservation, id: uuid()}]);
      setEditMode(false);
      setSelectedReservation(reservation);
  }

  function handleDeleteReservation(id: string){
    setReservations([...reservations.filter(x => x.id !== id)])

  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ExampleComponent />
        <ReservationDashboard
          reservations={reservations}
          selectedReservation={selectedReservation}
          selectReservation={handleSelectReservation}
          cancelSelectReservation={handleCancelSelectReservation}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditReservation}
          deleteReservation={handleDeleteReservation}
        />
      </Container>
    </>
  );
}

export default App;
