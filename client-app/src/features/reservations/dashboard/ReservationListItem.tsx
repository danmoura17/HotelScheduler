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
              {format(reservation.checkinDate!, 'dd MMMM yyyy')}
              </Item.Header>
            </Item.Content>
            <Item.Description>Hosted by Daniel</Item.Description>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(reservation.checkinDate!, 'dd MMMM yyyy')}
          <Icon name="marker" /> Brazil
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>
        {format(reservation.checkoutDate!, 'dd MMMM yyyy')}
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
