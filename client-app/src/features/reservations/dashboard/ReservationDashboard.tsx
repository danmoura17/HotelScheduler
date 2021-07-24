import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ReservationFilters from "./ReservationFilters";
import ReservationList from "./ReservationList";

export default observer(function ReservationDashboard() {
  const { reservationStore } = useStore();
  const {loadReservations, reservertionRegistry} = reservationStore;

  useEffect(() => {
    if (reservertionRegistry.size <=1 ) loadReservations();
  }, [reservertionRegistry.size, loadReservations]);

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ReservationList />
      </Grid.Column>
      <Grid.Column width="6">
        <ReservationFilters/>
      </Grid.Column>
    </Grid>
  );
});
