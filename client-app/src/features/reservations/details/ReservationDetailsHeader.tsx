import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Reservation} from "../../../app/models/reservation";

const reservationImageStyle = {
    filter: 'brightness(30%)'
};

const reservationImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    reservation: Reservation
}

export default observer (function reservationDetailedHeader({reservation}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' fluid style={reservationImageStyle}/>
                <Segment style={reservationImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={reservation.checkinDate}
                                    style={{color: 'white'}}
                                />
                                <p>{reservation.checkinDate}</p>
                                <p>
                                    Hosted by <strong>Daniel</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join reservation</Button>
                <Button>Cancel reservation</Button>
                <Button color='orange' floated='right'>
                    Manage Reservation
                </Button>
            </Segment>
        </Segment.Group>
    )
})
