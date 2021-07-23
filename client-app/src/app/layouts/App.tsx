import { useState, useEffect } from "react";
import { ExampleComponent } from "../../ExampleCompontent";
import { Container } from "semantic-ui-react";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/dashboard/ReservationDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { reservationStore } = useStore();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<
    Reservation | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    reservationStore.loadReservations();
  }, [reservationStore]);

  function handleCreateOrEditReservation(reservation: Reservation) {
    setSubmitting(true);
    if (reservation.id) {
      agent.Reservations.update(reservation).then(() => {
        setReservations([
          ...reservations.filter((x) => x.id !== reservation.id),
          reservation,
        ]);
        setSelectedReservation(reservation);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      reservation.id = uuid();
      agent.Reservations.create(reservation).then(() => {
        setReservations([...reservations, reservation]);
        setSelectedReservation(reservation);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteReservation(id: string) {
    setSubmitting(true);
    agent.Reservations.delete(id).then(() => {
      setReservations([...reservations.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ExampleComponent />
        <ReservationDashboard
          reservations={reservationStore.reservations}
          createOrEdit={handleCreateOrEditReservation}
          deleteReservation={handleDeleteReservation}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
