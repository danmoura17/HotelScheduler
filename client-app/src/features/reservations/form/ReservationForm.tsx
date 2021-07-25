import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { v4 as uuid } from "uuid";
import { Reservation } from "../../../app/models/reservation";
import MyDatePicker from "./MyDatePicker";
import { Formik } from "formik";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ReservationForm() {
  const history = useHistory();

  const { reservationStore } = useStore();
  const { createReservation, updateReservation, loading, loadReservation } =
    reservationStore;
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

  // function handleSubmit() {
  //   if (reservation.id.length === 0) {
  //     let newReservation = {
  //       ...reservation,
  //       id: uuid(),
  //     };
  //     createReservation(newReservation).then(() =>
  //       history.push(`/reservations/${newReservation.id}`)
  //     );
  //   } else {
  //     updateReservation(reservation).then(() =>
  //       history.push(`/reservations/${reservation.id}`)
  //     );
  //   }
  // }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  }

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

  const { t } = useTranslation();

  if (loading) return <LoadingComponent content="Loading reservation..." />;

  return (
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
                placeholderText='Date'  
                name='reservationDate' 
                dateFormat='MMMM d, yyyy h:mm aa'
            />
            <MyDateInput 
                placeholderText='Date'  
                name='checkinDate' 
                dateFormat='MMMM d, yyyy h:mm aa'
            />
            <MyDateInput 
                placeholderText='Date'  
                name='checkoutDate' 
                dateFormat='MMMM d, yyyy h:mm aa'
            />
            {/* <Form.Input
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
            /> */}
            <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/reservations' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
