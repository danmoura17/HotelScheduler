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
import ValidationMessageError from "../../errors/ErrorMessage";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useTranslation } from "react-i18next";

export default observer(function ReservationForm() {
  const { t } = useTranslation();

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

  const [errors, setErrors] = useState("");
  const [dateChanged, setDateChanged] = useState(false);

  const [reservation, setReservation] = useState<Reservation>({
    id: "",
    reservationDate: null,
    checkinDate: null,
    checkoutDate: null,
    attendedBy: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    email: "",
    phone: "",
  });

  const validationSchema = Yup.object({
    checkinDate: Yup.string().required(t('eCheckin')).nullable(),
    checkoutDate: Yup.string().required(t('eCheckout')).nullable(),
    email: Yup.string().required(t('eEmail')).email().nullable(),
    firstName: Yup.string().required(t('eFirstName')).nullable(),
    lastName: Yup.string().required(t('eLastName')).nullable(),
    country: Yup.string().required(t('eCountry')).nullable(),
    city: Yup.string().required(t('eCity')).nullable(),
    phone: Yup.string().required(t('ePhoneNumber')).nullable(),
  });

  useEffect(() => {
    if (id) {
      loadReservation(id).then((reservation) => {
        setReservation(reservation!)
      });
    }
    

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
    var startdateMoment = reservation.checkinDate!;
    var enddateMoment = reservation.checkoutDate!;

    let difference = dateDiffInDays(startdateMoment, enddateMoment);

    if (difference >= 3) {
      setErrors(t('eLongInterval'));
    } else {
      if (new Date(startdateMoment) > new Date(enddateMoment)) {
        setErrors(t('eOutBeforeInt'));
      } else {

        if(!dateChanged && (id) ){
          handleFormSubmit(reservation);
        }

        for (
          var reservationDates = [], dt = new Date(reservation.checkinDate!);
          dt <= reservation.checkoutDate!;
          dt.setDate(dt.getDate() + 1)
        ) {
          reservationDates.push(new Date(dt));
        }

        const availableDates = availableDate;

        let duplicates = [];

        for (var i = reservationDates.length - 1; i >= 0; i--) {
          for (var j = 0; j < availableDates.length; j++) {
            if (getOnlyDate(reservationDates[i]) === availableDates[j]) {
              duplicates.push(availableDates[j]);
            }
          }
        }

        if (duplicates.length !== 0) {
          handleFormSubmit(reservation);
        } else {
          setErrors(t('eUnavailableDate'));
        }
      }
    }
  }

  function handleFormSubmit(reservation: Reservation) {
    if (reservation.id.length === 0) {
      let newReservation = {
        ...reservation,
        id: uuid(),
        attendedBy: "Daniel",
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

  if (loading) return <LoadingComponent content={t("lLoadingReservation")} />;

  return (
    <>
      <Segment clearing>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={reservation}
          onSubmit={(values, { resetForm }) => handleTest(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty, }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Header content={t("lUserDetails")} sub color="teal" />
              <MyTextInput name="firstName" placeholder={t("lFirstName")} />
              <MyTextInput name="lastName" placeholder={t("lLastName")} />
              <MyTextInput name="country" placeholder={t("lCountry")} />
              <MyTextInput name="city" placeholder={t("lCity")} />
              <MyTextInput name="email" placeholder={t("lEmail")} />
              <MyTextInput name="phone" placeholder={t("lPhone")} />

              <Header content={t("lReservationDetails")} sub color="teal" />
              <MyDateInput
                placeholderText={t("lCheckin")}
                name="checkinDate"
                dateFormat="MMMM d, yyyy"
                minDate={tomorrow}
                maxDate={oneMonthFuture}
                onChangeRaw={()=>setDateChanged(true)}
              />
              <MyDateInput
                placeholderText={t("lCheckout")}
                name="checkoutDate"
                dateFormat="MMMM d, yyyy"
                minDate={tomorrow}
                maxDate={oneMonthFuture}
                onChangeRaw={()=>setDateChanged(true)}
              />
              <Button
                disabled={!(isValid && dirty)}
                loading={loading}
                floated="right"
                positive
                type="submit"
                content={t("bSubmit")}
              />
              <Button
                as={Link}
                to="/reservations"
                floated="right"
                type="button"
                content={t("bCancel")}
              />
            </Form>
          )}
        </Formik>
      </Segment>
      {errors && <ValidationMessageError message={errors} />}
      <Container>
        <Header
          style={{ fontSize: 30 }}
          content={t("lAvailableDates")}
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
