import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  List,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { v4 as uuid } from "uuid";
import { Reservation } from "../../../app/models/reservation";
import { Formik } from "formik";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { format } from "date-fns";

export default observer(function ReservationForm() {
  const history = useHistory();

  const { reservationStore } = useStore();
  const {
    createReservation,
    updateReservation,
    loading,
    loadReservation,
    availableDate,
  } = reservationStore;
  const { id } = useParams<{ id: string }>();

  const [reservation, setReservation] = useState<Reservation>({
    id: "",
    reservationDate: null,
    checkinDate: null,
    checkoutDate: null,
  });

  const validationSchema = Yup.object({
    reservationDate: Yup.string().required("Date is required").nullable(),
    checkinDate: Yup.string().required("Date is required").nullable(),
    checkoutDate: Yup.string().required("Date is required").nullable(),
  });

  useEffect(() => {
    if (id)
      loadReservation(id).then((reservation) => setReservation(reservation!));
  }, [id, loadReservation]);

  function handleFormSubmit(reservation: Reservation) {
    if (reservation.id.length === 0) {
      let newReservation = {
        ...reservation,
        id: uuid(),
      };
      createReservation(newReservation).then(() =>
        history.push(`/reservations/${newReservation.id}`)
      );
    } else {
      updateReservation(reservation).then(() =>
        history.push(`/reservations/${reservation.id}`)
      );
    }
  }

  if (loading) return <LoadingComponent content="Loading reservation..." />;

  return (
    <>
      <Segment clearing>
        <Header content="Reservation Details" sub color="teal" />
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={reservation}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <MyDateInput
                placeholderText="Date"
                name="reservationDate"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <MyDateInput
                placeholderText="Date"
                name="checkinDate"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <MyDateInput
                placeholderText="Date"
                name="checkoutDate"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                as={Link}
                to="/reservations"
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        </Formik>
      </Segment>
      <Container>
        <List divided relaxed>
          {availableDate.map((date) => (
            <List.Item key={date.toString()}>{date}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
});
