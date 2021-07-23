import { useState, useEffect } from "react";
import { ExampleComponent } from "../../ExampleCompontent";
import { Container } from "semantic-ui-react";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";
import ReservationDashboard from "../features/dashboard/ReservationDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<
    Reservation | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Reservations.list().then((response) => {
      let reservations: Reservation[] = [];
      response.forEach(reservation => {
        reservation.reservationDate = reservation.reservationDate.split('T')[0];
        reservation.checkinDate = reservation.checkinDate.split('T')[0];
        reservation.checkoutDate = reservation.checkoutDate.split('T')[0];
        reservations.push(reservation)
      })
      setReservations(reservations);
      setLoading(false);
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
    setSubmitting(true);
    if(reservation.id){
      agent.Reservations.update(reservation).then(()=>{
        setReservations([
          ...reservations.filter((x) => x.id !== reservation.id),
          reservation,
        ])
        setSelectedReservation(reservation)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      reservation.id = uuid();
      agent.Reservations.create(reservation).then(() => {
        setReservations([...reservations, reservation])
        setSelectedReservation(reservation)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  function handleDeleteReservation(id: string) {
    setSubmitting(true);
    agent.Reservations.delete(id).then(() => {
      setReservations([...reservations.filter((x) => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if (loading) return <LoadingComponent content='Loading app' />

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
