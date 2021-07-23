import { ChangeEvent, useState } from "react";
import { Button, Container, Form, Segment } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";
import { useTranslation } from "react-i18next";
import SemanticDatepicker from "react-semantic-ui-datepickers";

interface Props {
  reservation: Reservation | undefined;
  closeForm: () => void;
  createOrEdit: (reservation: Reservation) => void;
  submitting: boolean;
}

export default function ReservationForm({
  reservation: selectedReservation,
  closeForm,
  createOrEdit,
  submitting
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
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}
