import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

const filtersearch = (props) => {
    return (
        <div className="search-bar">
            <InputGroup>
                <Input value={props.search} onChange={props.change} className="search-filter" placeholder="Search title and tag" />
                <InputGroupAddon addonType="append"><Button onClick={props.clear}>Clear</Button></InputGroupAddon>
            </InputGroup>
        </div>
    );
}

export default filtersearch;