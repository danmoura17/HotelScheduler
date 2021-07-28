import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ReservationDetailedInfo from "./ReservationDetailedInfo";
import ReservationDetailsHeader from "./ReservationDetailsHeader";

export default observer(function ReservationDetails() {
  const { t } = useTranslation()

  const { reservationStore } = useStore();
  const {
    selectedReservation: reservation,
    loadReservation,
    loadingInitial,
  } = reservationStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadReservation(id);
  }, [id, loadReservation]);

  if (loadingInitial || !reservation) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ReservationDetailsHeader reservation={reservation} translation={t}/>
      </Grid.Column>
      <Grid.Column width={6}>
      <ReservationDetailedInfo reservation={reservation}/>
      </Grid.Column>
    </Grid>
  );
})
