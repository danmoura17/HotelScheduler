import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Grid, Header, Icon, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/loadingComponent";
import { Reservation } from "../../../app/models/reservation";
import { useStore } from "../../../app/stores/store";
import ReservationFilters from "./ReservationFilters";
import ReservationList from "./ReservationList";

export default function ReservationDelete() {
  const history = useHistory();

  const { reservationStore } = useStore();
  const { deleteReservation } = reservationStore;
  const { id } = useParams<{ id: string }>();


  function handleFormSubmit() {

      deleteReservation(id).then(() =>
        history.push(`/reservations`)
      );
  }

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading reservations..." />;

  return (
    <>
      <Segment placeholder>
            <Header icon>
                <Icon name='delete' color='red'/>
                Deseja deletar essa reserva?
            </Header>
            <Segment.Inline>
                <Button onClick={()=>handleFormSubmit()} negative>
                    Cancelar
                </Button>
            </Segment.Inline>
        </Segment>
    </>
  );
}
