import React from "react";
import Moment from "react-moment";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";

interface Props {
  reservation: Reservation;
}

export default function ReservationDetails({ reservation }: Props) {
  return (
    <Card fluid>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          <Moment>{reservation.reservationDate}</Moment>
        </Card.Header>
        <Card.Meta>
          <span><Moment>{reservation.reservationDate}</Moment></span>
        </Card.Meta>
        <Card.Description>
        <Moment>{reservation.reservationDate}</Moment>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button basic color='blue' content='Edit'/>
            <Button basic color='grey' content='Cancel'/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
