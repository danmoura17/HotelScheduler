import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function ReservationForm() {

const {reservationStore} = useStore();
const {selectedReservation, closeForm, createReservation, updateReservation, loading} = reservationStore;

  const initialState = selectedReservation ?? {
    id: "",
    reservationDate: "",
    checkinDate: "",
    checkoutDate: "",
  };

  const [reservation, setReservation] = useState(initialState);

  function handleSubmit() {
    reservation.id ? updateReservation(reservation) : createReservation(reservation)
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  }

  const { t } = useTranslation();

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
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}
)