import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Navigation from '../../components/Layout/Navigation/Navigation';
import { NavItem } from 'reactstrap';
import { NavLink } from "react-router-dom";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';
import './ImportPages.css';

class ImportPages extends Component {
    componentDidMount() {
        this.props.onFetchPage();
    }

    render() {       
        let navigation = <Spinner />;
        if (this.props.data) {
            navigation = this.props.data.map(item => (
                <NavItem key={item.id}>
                    <NavLink to={item.path}>{item.title}</NavLink>
                </NavItem>
            ))
        }
        return (
            <Navigation nav={navigation} />
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: () => dispatch(actions.fetchPage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})( withErrorHandler( ImportPages, axios ) );