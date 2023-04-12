import { Button, Card } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { desktopActions } from '../store/index'
import {removeLease} from '../graphql/queries'
function Lease(props) {
    const dispatch = useDispatch()
    const config = useSelector(state => state.desktop.config)

    const stopleaseHandler = async (lease) => {
        const user = await removeLease(config,lease)
        dispatch(desktopActions.setUser(user))
    }

    return (<Card  className='text-center' style={{ width: '23rem' }}>
        <Card.Body>
            <Card.Title>{props.lease.instance}</Card.Title>
            <Card.Text>
                User: kasm_user
            </Card.Text>
            <Card.Text>
                Password: {props.lease.password}
            </Card.Text>
            <Card.Text>
                Start time: {props.lease.starttime}
            </Card.Text>
            <Card.Link href={"https://" + props.lease.publicIP}>Open Remote Desktop</Card.Link>
            <Card.Link onClick={() => stopleaseHandler(props.lease)}>Stop Lease</Card.Link>
        </Card.Body>
    </Card>)
}


export default Lease 