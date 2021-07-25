import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Reservation} from "../../../app/models/reservation";
import {format} from 'date-fns'


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
                                    content={format(reservation.checkinDate!, 'dd MMMM yyyy')}
                                    style={{color: 'white'}}
                                />
                                <p>{format(reservation.checkinDate!, 'dd MMMM yyyy')}</p>
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
                <Button as={Link} to={`/manage/${reservation.id}`} color='orange' floated='right'>
                    Manage Reservation
                </Button>
            </Segment>
        </Segment.Group>
    )
})