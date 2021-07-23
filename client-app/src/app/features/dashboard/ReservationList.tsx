import Moment from "react-moment";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";
import { useTranslation } from "react-i18next";



interface Props {
  reservations: Reservation[];
  selectReservation: (id: string) => void;
  deleteReservation: (id: string) => void;

}

export default function ReservationList({ reservations, selectReservation, deleteReservation }: Props) {
    const { t } = useTranslation();


  return (
    <Segment>
      <Item.Group divided>
        {reservations.map((reservation) => (
          <Item key={reservation.id}>
            <Item.Content>
              <Item.Header as="a">
                <Moment
                locale={t("locale")}
                format='LLLL'
                  date={reservation.reservationDate}
                />
              </Item.Header>

              <Item.Meta>{reservation.checkinDate}</Item.Meta>
              <Item.Description>{reservation.checkoutDate}</Item.Description>
              <Item.Extra>
                <Button onClick={() => selectReservation(reservation.id)} floated="right" content="View" color="blue" />
                <Button onClick={() => deleteReservation(reservation.id)} floated="right" content="Delete" color="red" />
                <Label basic content="Teste" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
