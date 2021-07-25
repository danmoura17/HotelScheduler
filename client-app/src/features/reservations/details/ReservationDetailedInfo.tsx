import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";
import {format} from 'date-fns'


interface Props {
  reservation: Reservation;
}

export default observer(function ReservationDetailedInfo({
  reservation,
}: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>{format(reservation.checkinDate!, 'dd MMMM yyyy')}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{format(reservation.checkinDate!, 'dd MMMM yyyy')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Brazil, Rio de Janeiro</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
