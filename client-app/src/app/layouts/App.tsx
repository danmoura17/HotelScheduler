import { useState, useEffect, Fragment } from "react";
import { ExampleComponent } from "../../ExampleCompontent";
import { i18n } from "../../translations/i18n";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";

function App() {
  const [language, setLanguage] = useState("en");
  const [reservations, setReservation] = useState<Reservation[]>([]);

  useEffect(() => {
    axios
      .get<Reservation[]>("http://localhost:5000/api/reservations")
      .then((response) => {
        console.log(response);
        setReservation(response.data);
      });
  }, []);

  const handleOnclick = (e: any) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <ExampleComponent />
        <List>
          {reservations.map((reservation) => (
            <List.Item key={reservation.id}>
              {reservation.reservationDate}
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
