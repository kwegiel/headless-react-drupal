import React from 'react';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux/Aux';
import './Layout.css';


const layout = (props) => {
    return (
        <Aux>
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
        </Aux>
    );
}

export default layout;