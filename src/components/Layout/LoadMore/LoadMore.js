import React from 'react';
import { Button } from 'reactstrap';
import './LoadMore.css';

const loadmore = (props) => {
    return (
        <div className="load-more" >           
            <Button outline onClick={props.click} color="primary" size="lg">Load more</Button>
        </div>
    );
}

export default loadmore;