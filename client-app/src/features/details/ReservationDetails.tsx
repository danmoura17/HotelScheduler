import Moment from "react-moment";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layouts/loadingComponent";
import { useStore } from "../../app/stores/store";


export default function ReservationDetails() {

const {reservationStore} = useStore();
const {selectedReservation: reservation, openForm, cancelSelectedReservation} = reservationStore;

if(!reservation) return <LoadingComponent/>;

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
          <span><Moment>{reservation.reservationDate}</Moment></span>
        </Card.Meta>
        <Card.Description>
        <Moment>{reservation.reservationDate}</Moment>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(reservation.id)} basic color='blue' content='Edit'/>
            <Button onClick={cancelSelectedReservation} basic color='grey' content='Cancel'/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
