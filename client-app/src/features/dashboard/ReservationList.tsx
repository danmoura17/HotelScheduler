import Moment from "react-moment";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function ReservationList() {
const {reservationStore} = useStore();
const {deleteReservation, reservationsByDate, loading} = reservationStore;

  const { t } = useTranslation();
  const [target, setTarget] = useState('');

  function handleReservationDelete(e: SyntheticEvent<HTMLButtonElement>, id:string) {
    setTarget(e.currentTarget.name);
    deleteReservation(id);
  }


  return (
    <Segment>
      <Item.Group divided>
        {reservationsByDate.map((reservation) => (
          <Item key={reservation.id}>
            <Item.Content>
              <Item.Header as="a">
                <Moment
                  locale={t("locale")}
                  format="LLLL"
                  date={reservation.reservationDate}
                />
              </Item.Header>

              <Item.Meta>{reservation.checkinDate}</Item.Meta>
              <Item.Description>{reservation.checkoutDate}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => reservationStore.selectReservation(reservation.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={reservation.id}
                  loading={loading && target == reservation.id}
                  onClick={(e) => handleReservationDelete(e, reservation.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content="Teste" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
})
