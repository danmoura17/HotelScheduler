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
import { Formik, useFormikContext, getIn } from "formik";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/form/MyDateInput";
import ValidationMessageError from "../../errors/ErrorMessage";

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

  const [errors, setErrors] = useState('');



  const [reservation, setReservation] = useState<Reservation>({
    id: "",
    reservationDate: null,
    checkinDate: null,
    checkoutDate: null,
  });

  const validationSchema = Yup.object({
    checkinDate: Yup.string().required("Checkin date is required").nullable(),
    checkoutDate: Yup.string().required("Checkout date is required").nullable(),
  });

  useEffect(() => {
    if (id)
      loadReservation(id).then((reservation) => setReservation(reservation!));
  }, [id, loadReservation]);

  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let oneMonthFuture = new Date();
  oneMonthFuture.setMonth(oneMonthFuture.getMonth() + 1);

  function getOnlyDate(date: Date) {
    return new Date(date).toDateString();
  }

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a: any, b: any) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


  function handleTest(reservation: Reservation) {

    var startdateMoment = reservation.checkinDate!
    var enddateMoment = reservation.checkoutDate!

    console.log(reservation.checkinDate!)
    console.log(reservation.checkoutDate!)

    let difference = dateDiffInDays(startdateMoment, enddateMoment);
  
    if(difference >= 3) {
      setErrors("Too many days")
    } else {

      if(new Date(startdateMoment) > new Date(enddateMoment)){
        setErrors("Checkout can not be before checkin")
      } else {

        for (var reservationDates = [], dt = new Date(reservation.checkinDate!); dt <= reservation.checkoutDate!; dt.setDate(dt.getDate() + 1)) {
          reservationDates.push(new Date(dt));
        }
    
        console.log(reservationDates)
    
        const availableDates = availableDate;
        console.log(reservationDates)
    
        let duplicates = [];
    
        for (var i = reservationDates.length - 1; i >= 0; i--) {
          for (var j = 0; j < availableDates.length; j++) {
    
            if (getOnlyDate(reservationDates[i]) === availableDates[j]) {
              duplicates.push(availableDates[j])
              }
            }
          }
          console.log(duplicates)
    
        
    
        if (duplicates.length !== 0) {
          handleFormSubmit(reservation)
        } else {
          setErrors("Data indisponível. Verifique as datas abaixo:");
        }

      }

      

    }

    
  }

  function handleFormSubmit(reservation: Reservation) {
    if (reservation.id.length === 0) {
      let newReservation = {
        ...reservation,
        id: uuid(),
        reservationDate: today,
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

  const handleReset = () => {
    if (!window.confirm('Reset?')) {
       
    }
  };

  if (loading) return <LoadingComponent content="Loading reservation..." />;


  return (
    <>
      <Segment clearing>
        <Header content="Reservation Details" sub color="teal" />
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={reservation}
          onSubmit={(values, {resetForm}) => handleTest(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (

            
            <Form onSubmit={handleSubmit} autoComplete="off">
              <MyDateInput
                placeholderText="Checkin Date"
                name="checkinDate"
                dateFormat="MMMM d, yyyy"
                minDate={tomorrow}
                maxDate={oneMonthFuture}
              />
              <MyDateInput
                placeholderText="Checkout Date"
                name="checkoutDate"
                dateFormat="MMMM d, yyyy"
                minDate={tomorrow}
                maxDate={oneMonthFuture}
              />
              <Button
                disabled={isSubmitting}
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
      {
          errors &&  <ValidationMessageError message={errors} />
        }
      <Container>
        <Header
          style={{ fontSize: 30 }}
          content="Available dates"
          sub
          color="teal"
        />
        <List divided relaxed>
          {availableDate.map((date) => (
            <List.Item key={date.toString()}>{date}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
});
