import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { v4 as uuid } from "uuid";


export default observer(function ReservationForm() {
  const history = useHistory()

  const { reservationStore } = useStore();
  const { createReservation, updateReservation, loading, loadReservation } =
    reservationStore;
  const { id } = useParams<{ id: string }>();

  const [reservation, setReservation] = useState({
    id: "",
    reservationDate: "",
    checkinDate: "",
    checkoutDate: "",
  });

  useEffect(()=> {
    if(id) loadReservation(id).then(reservation => setReservation(reservation!))
  }, [id, loadReservation])

  function handleSubmit() {
    if (reservation.id.length === 0) {
      let newReservation = {
        ...reservation,
        id: uuid()
      };
      createReservation(newReservation).then(()=>history.push(`/reservations/${newReservation.id}`))
    } else {
      updateReservation(reservation).then(()=>history.push(`/reservations/${reservation.id}`))
    }
      
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  }

  const { t } = useTranslation();

  if(loading) return <LoadingComponent content='Loading reservation...'/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          type="date"
          locale={t("locale")}
          placeholder="ReservationDate"
          value={reservation.reservationDate}
          name="reservationDate"
          onChange={handleInputChange}
        />

        <Form.Input
          type="date"
          placeholder="Checkin"
          value={reservation.checkinDate}
          name="checkinDate"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Checkout"
          value={reservation.checkoutDate}
          name="checkoutDate"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button as={Link} to='/reservations' floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
