import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ReservationListItem from "./ReservationListItem";
import { Fragment } from "react";

export default observer(function ReservationList() {
  const { reservationStore } = useStore();
  const { groupedReservations } = reservationStore;

  return (
    <>
      {groupedReservations.map(([group, reservations]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {reservations.map((reservation) => (
            <ReservationListItem
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
});
