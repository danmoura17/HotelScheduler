import { Grid } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";
import ReservationDetails from "../details/ReservationDetails";
import ReservationForm from "../form/ReservationForm";
import ReservationList from "./ReservationList";

interface Props {
  reservations: Reservation[];
  selectedReservation: Reservation | undefined;
  selectReservation: (id: string) => void;
  cancelSelectReservation: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
}

export default function ReservationDashboard({
  reservations,
  selectedReservation,
  selectReservation,
  cancelSelectReservation,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteReservation
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ReservationList
          reservations={reservations}
          selectReservation={selectReservation}
          deleteReservation={deleteReservation}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedReservation && (
          <ReservationDetails
            reservation={selectedReservation}
            cancelSelectReservation={cancelSelectReservation}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ReservationForm
            closeForm={closeForm}
            reservation={selectedReservation}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
