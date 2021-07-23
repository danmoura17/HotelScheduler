import moment from "moment";
import React from "react";
import Moment from "react-moment";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Reservation } from "../../models/reservation";
import { i18n } from "../../../translations/i18n";
import { useTranslation } from "react-i18next";



interface Props {
  reservations: Reservation[];
}

export default function ReservationList({ reservations }: Props) {
    const { t } = useTranslation();


  return (
    <Segment>
      <Item.Group divided>
        {reservations.map((reservation) => (
          <Item key={reservation.id}>
            <Item.Content>
              <Item.Header as="a">
                <Moment
                locale={t("locale")}
                format='LLLL'
                  date={reservation.reservationDate}
                />
              </Item.Header>

              <Item.Meta>{reservation.checkinDate}</Item.Meta>
              <Item.Description>{reservation.checkoutDate}</Item.Description>
              <Item.Extra>
                <Button floated="right" content="View" color="blue" />
                <Label basic content="Teste" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
