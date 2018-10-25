import React from 'react';
import { Col, Card, CardImg, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import BootstrapModal from '../BootstrapModal/BootstrapModal';
import './PortfolioItem.css';


const PortfolioItem = (props) => {
    return (
        <Col sm="4" className="fade-in portfolio-item">
            <Card>
                <CardImg top width="100%" src={props.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>                    
                    <CardSubtitle onClick={props.tagSort}><div className="portfolio-item--tag">{props.tag}</div></CardSubtitle>
                    <BootstrapModal title={props.title} body={props.body} />
                </CardBody>
            </Card>
        </Col>
    );
};

export default PortfolioItem;