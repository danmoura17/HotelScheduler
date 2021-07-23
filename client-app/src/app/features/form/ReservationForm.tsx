import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function ReservationForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='ReservationDate'/>
                <Form.Input placeholder='Checkin'/>
                <Form.Input placeholder='Checkout'/>
                <Button floated='right' positive type='submit' content="Submit"/>
                <Button floated='right' type='button' content="Cancel"/>
            </Form>
        </Segment>
    )
}