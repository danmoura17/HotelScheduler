import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";

interface Props {
  reservation: Reservation;
}

export default function ReservationListItem({ reservation }: Props) {


  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/reservations/${reservation.id}`}>
                {reservation.checkinDate}
              </Item.Header>
            </Item.Content>
            <Item.Description>Hosted by Daniel</Item.Description>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {reservation.checkinDate}
          <Icon name="marker" /> Brazil
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>
          {reservation.checkoutDate}
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
