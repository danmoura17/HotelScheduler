import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";
import ReservationDetails from "../details/ReservationDetails";
import ReservationForm from "../form/ReservationForm";
import ReservationList from "./ReservationList";

interface Props {
  reservations: Reservation[];
}

export default function ReservationDashboard({ reservations }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ReservationList reservations={reservations} />
      </Grid.Column>
      <Grid.Column width="6">
        {reservations[0] && 
          <ReservationDetails reservation={reservations[0]} />}
          <ReservationForm/>
        
      </Grid.Column>
    </Grid>
  );
}
