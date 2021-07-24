import { useEffect } from "react";
import { ExampleComponent } from "../../ExampleCompontent";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/dashboard/ReservationDashboard";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { reservationStore } = useStore();

  useEffect(() => {
    reservationStore.loadReservations();
  }, [reservationStore]);

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ExampleComponent />
        <ReservationDashboard />
      </Container>
    </>
  );
}

export default observer(App);
