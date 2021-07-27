import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";
import {format} from 'date-fns'

interface Props {
  reservation: Reservation;
}

export default function ReservationListItem({ reservation }: Props) {


  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/reservations/${reservation.id}`}>
              {reservation.firstName} {reservation.lastName}
              </Item.Header>
              <Item.Meta> <Icon name="clock" /> Checkin: {format(reservation.checkinDate!, 'dd MMMM yyyy')}</Item.Meta>
              <Item.Meta> <Icon name="clock" /> Checkout: {format(reservation.checkinDate!, 'dd MMMM yyyy')}</Item.Meta>
            </Item.Content>
            <Item.Description>Attended by {reservation.attendedBy}</Item.Description>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="marker" /> {reservation.country} - {reservation.city}
        </span>
      </Segment>
      <Segment secondary>Reserved in:</Segment>
      <Segment clearing>
        <span>
        {format(reservation.reservationDate!, 'dd MMMM yyyy')}
          <Button 
          as={Link} 
          to={`/reservations/${reservation.id}`}
          color='teal'
          floated='right'
          content='view'

           />
        </span>
      </Segment>
    </Segment.Group>
  );
}
