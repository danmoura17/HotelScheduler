import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon, List } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface Props {
  reservation: Reservation;
}

export default observer(function ReservationDetailedInfo({
  reservation,
}: Props) {
  const { t } = useTranslation();

  const checkinDate = reservation.checkinDate
  const checkoutDate = reservation.checkoutDate
  const reservationDate = reservation.reservationDate

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="address book outline" />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>
              {reservation.firstName} {reservation.lastName}
             
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{reservation.country}, {reservation.city}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="at" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{reservation.email}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="phone" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{reservation.phone} </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <List>
              <List.Item>
                <span> {t("lCheckin")}:{" "} <strong>{t("dates.shortDatein", { checkinDate })}</strong></span>
              </List.Item>
              <List.Item>
                <span>{t("lCheckout")}:{" "}<strong>{t("dates.shortDateout", { checkoutDate })}</strong></span>
              </List.Item>
              <List.Item>
                
              </List.Item>
              <List.Item>
                <span> {t("bAttendedBy")}: <strong>{reservation.attendedBy}</strong> </span>
              </List.Item>
              <List.Item>
                <span>{t("lReservedIn")} <strong>{t("dates.shorReservation", { reservationDate })}</strong></span>
              </List.Item>
              
            </List>
            
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
