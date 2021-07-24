import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ReservationForm from "../../features/reservations/form/ReservationForm";
import ReservationDetails from "../../features/reservations/details/ReservationDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route
                exact
                path="/reservations"
                component={ReservationDashboard}
              />
              <Route path="/reservations/:id" component={ReservationDetails} />
              <Route
                key={location.key}
                path={["/createReservation", "/manage/:id"]}
                component={ReservationForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
