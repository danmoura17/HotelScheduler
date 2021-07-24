import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ReservationDetails() {
  const { reservationStore } = useStore();
  const {
    selectedReservation: reservation,
    loadReservation,
    loadingInitial,
  } = reservationStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadReservation(id);
  }, [id, loadReservation]);

  if (loadingInitial || !reservation) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          <Moment>{reservation.reservationDate}</Moment>
        </Card.Header>
        <Card.Meta>
          <span>
            <Moment>{reservation.reservationDate}</Moment>
          </span>
        </Card.Meta>
        <Card.Description>
          <Moment>{reservation.reservationDate}</Moment>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/manage/${reservation.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to={'/reservations'} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
})
