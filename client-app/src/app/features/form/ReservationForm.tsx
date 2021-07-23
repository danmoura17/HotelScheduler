import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";

interface Props {
  reservation: Reservation | undefined;
  closeForm: () => void;
  createOrEdit: (reservation: Reservation) => void;
}

export default function ReservationForm({
  reservation: selectedReservation,
  closeForm,
  createOrEdit
}: Props) {
  const initialState = selectedReservation ?? {
    id: "",
    reservationDate: "",
    checkinDate: "",
    checkoutDate: "",
  };

  const [reservation, setReservation] = useState(initialState);

  function handleSubmit() {
    createOrEdit(reservation);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="ReservationDate"
          value={reservation.reservationDate}
          name="reservationDate"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Checkin"
          value={reservation.checkinDate}
          name="checkinDate"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Checkout"
          value={reservation.checkoutDate}
          name="checkoutDate"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}
