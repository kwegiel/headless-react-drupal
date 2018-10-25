import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'reactstrap';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';

class SinglePage extends Component {
  render() {    
    let page = <Spinner />;
    if (this.props.data) {
      page = this.props.data.filter(
        (item) => {
          return item.path.indexOf(this.props.location.pathname.toString()) !== -1;
        }
      );      
      if (page.length) {
        page = page.map(item => {
          return (
            <Aux key={item.id}>
              <Row>
                <Col sm="12">
                  <h1>{item.title}</h1>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div className="fade-in" dangerouslySetInnerHTML={{ __html: item.body.value }}></div>
                </Col>
              </Row>
            </Aux>
          )
        })
      } else {
        page = <h1>Page not found</h1>
      }
    }
    return (
      <Aux>
        {page}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(SinglePage);