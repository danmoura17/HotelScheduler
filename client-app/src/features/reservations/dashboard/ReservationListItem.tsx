import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";
import {format} from 'date-fns'
import { useTranslation } from "react-i18next";

interface Props {
  reservation: Reservation;
}

export default function ReservationListItem({ reservation }: Props) {
  const { t } = useTranslation();

  const reservedDate = reservation.reservationDate!;
  const checkinDate = reservation.checkinDate!;
  const checkoutDate = reservation.checkoutDate

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/reservations/${reservation.id}`}>
              {reservation.firstName} {reservation.lastName}
              </Item.Header>
              <Item.Meta> <Icon name="clock outline" /> {t('lCheckin')}: {t("dates.localisedDate", { checkinDate })}</Item.Meta>
              <Item.Meta> <Icon name="clock" /> {t('lCheckout')}: {t("dates.localisedDateout", { checkoutDate })}</Item.Meta>
            </Item.Content>
            <Item.Description>{t('bAttendedBy')} {reservation.attendedBy}</Item.Description>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="marker" /> {reservation.country} - {reservation.city}
        </span>
      </Segment>
      <Segment secondary>{t('lReservedIn')}</Segment>
      <Segment clearing>
        <span>
        {t("dates.reservedDate", { reservedDate })}
          <Button 
          as={Link} 
          to={`/reservations/${reservation.id}`}
          color='teal'
          floated='right'
          content={t('bViewReservation')}

           />
        </span>
      </Segment>
    </Segment.Group>
  );
}
