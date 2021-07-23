import { Grid } from "semantic-ui-react";
import { Reservation } from "../../app/models/reservation";
import { useStore } from "../../app/stores/store";
import ReservationDetails from "../details/ReservationDetails";
import ReservationForm from "../form/ReservationForm";
import ReservationList from "./ReservationList";

interface Props {
  reservations: Reservation[];
  createOrEdit: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
  submitting: boolean;
}

export default function ReservationDashboard({
  reservations,
  createOrEdit,
  deleteReservation,
  submitting,
}: Props) {
  const { reservationStore } = useStore();
  const { selectedReservation, editMode } = reservationStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ReservationList
          reservations={reservations}
          deleteReservation={deleteReservation}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedReservation && !editMode && <ReservationDetails /> }
        {editMode && (
          <ReservationForm
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
