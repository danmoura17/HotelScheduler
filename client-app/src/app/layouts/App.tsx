import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ReservationForm from "../../features/reservations/form/ReservationForm";
import ReservationDetails from "../../features/reservations/details/ReservationDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./loadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ReservationDelete from "../../features/reservations/dashboard/ReservationDelete";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/reservations"
                  component={ReservationDashboard}
                />
                <Route
                  path="/reservations/:id"
                  component={ReservationDetails}
                />
                <Route
                  key={location.key}
                  path={["/createReservation", "/manage/:id"]}
                  component={ReservationForm}
                />
                <Route
                  key={location.key}
                  path={["/deleteReservation", "/delete/:id"]}
                  component={ReservationDelete}
                />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
