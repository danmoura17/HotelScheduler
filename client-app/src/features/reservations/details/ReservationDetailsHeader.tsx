import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Reservation } from "../../../app/models/reservation";
import { format } from "date-fns";

const reservationImageStyle = {
  filter: "brightness(30%)",
};

const reservationImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  reservation: Reservation;
  translation: any;
}

export default observer(function reservationDetailedHeader({
  reservation,
  translation,
}: Props) {
  const date = reservation.checkinDate!;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src="http://www.nobretur.com.br/images/resized/tourist_packages/15245879535adf5db102303.jpg?s=medium"
          fluid
          style={reservationImageStyle}
        />
        <Segment style={reservationImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={reservation.firstName}
                  style={{ color: "white" }}
                />

                <p>{translation("dates.fullDate", { date })}</p>
                <p>{translation("dates.localisedDate", { date })}</p>
                <p>{translation("dates.weekDay", { date })}</p>
                <p>{translation("dates.postedOn", { date })}</p>
                <p>{translation("dates.fullDateComplete", { date })}</p>
                <p>{translation("dates.postedOn", { date })}</p>

                <p>
                  {translation("lCheckin")}:{" "}
                  {translation("dates.localisedDate", { date })}
                </p>
                <p>
                  {translation("lCheckout")}:{" "}
                  {format(reservation.checkoutDate!, "dd MMMM yyyy")}
                </p>
                <p>
                  {translation("bAttendedBy")}{" "}
                  <strong>{reservation.attendedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button as={Link} to={`/delete/${reservation.id}`}>
          {translation('vDeleteReservation')}
        </Button>
        <Button
          as={Link}
          to={`/manage/${reservation.id}`}
          color="orange"
          floated="right"
        >
          {translation('bEditReservation')}
        </Button>
      </Segment>
    </Segment.Group>
  );
});
