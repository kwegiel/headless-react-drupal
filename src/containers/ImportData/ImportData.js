import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from '../../axios';
import './ImportData.css';
import FilterSearch from '../../components/Layout/FilterSearch/FilterSearch';
import LoadMore from '../../components/Layout/LoadMore/LoadMore';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import PortfolioItem from '../../components/Layout/PortfolioItem/PortfolioItem';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class ImportData extends Component {
    state = {
        data: null,
        included: [],
        search: '',
        visible: 12,
        error: false,
        modal: false,
        selectedId: null
    }
    componentDidMount() {
        if (!this.state.data) {
            axios.get('/node/article?_consumer_id=05c7b6e5-7a48-41ab-bb75-cb9dd8fb01df&format=api_json&fields[node--article]=field_image,title,field_tags,uid,body&include=field_image,field_tags')
                .then(res => {
                    const resData = res.data.data;                    
                    const updatedData = resData.map(item => {
                        return {
                            id: item.id,
                            title: item.attributes.title,
                            img: this.returnImgHandler(res.data.included, item.relationships.field_image.data.id),
                            tag: this.returnTagHandler(res.data.included, item.relationships.field_tags.data.id),
                            body: item.attributes.body.value
                        }
                    });                    
                    this.setState({ data: updatedData });
                    this.setState({ included: res.data.included });
                })
                .catch(error => {                    
                    this.setState({ error: true });
                });
        }
    }
    modalOpenHandler = (id) => {
        this.setState({ selectedId: id });
        this.setState({ modal: true });
    }

    modalCloseHandler = () => {
        this.setState({ modal: false });
        this.setState({ selectedId: null });
    }
    searchHandler = (event) => {
        this.setState({
            search: event.target.value
        });
    }
    returnTagHandler = (data, id) => {
        let tag = data.filter(
            (item) => {
                return item.id.indexOf(id.toString()) !== -1;
            }
        );
        tag = tag.map(item => { return item.attributes.name })
        return tag.toString();

    }
    returnImgHandler = (data, id) => {
        let img = data.filter(
            (item) => {
                return item.id.indexOf(id.toString()) !== -1;
            }
        );
        img = img.map(item => { return item.meta.derivatives.thumb })
        return img.toString();
    }
    filterHandler = (filter) => {
        this.setState({
            search: filter
        });
    }
    loadMoreHandler() {
        this.setState((prev) => {
            return { visible: prev.visible + 12 };
        });
    }
    render() {
        let filteredData = <p style={{ textAlign: 'center' }}>Something went wrong! Try refreshing the page. </p>;
        let loadMoreBtn = null;
        if (this.state.data) {
            if (!this.state.error) {
                filteredData = this.state.data.filter(
                    (item) => {
                        return item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || item.tag.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                    }
                );
                if (filteredData.length > this.state.visible) {
                    loadMoreBtn = <LoadMore click={this.loadMoreHandler.bind(this, this.state.visible)} />;
                }
                filteredData = filteredData.slice(0, this.state.visible).map(item => (
                    <PortfolioItem
                        key={item.id}
                        title={item.title}                        
                        image={item.img}
                        body={item.body}
                        tag={item.tag}
                        tagSort={() => this.filterHandler(item.tag)}
                        className="fade-in"
                    />

                ))
            }
        } else {
            filteredData = <Spinner />;
        }
        return (
            <Aux>
                <Row>
                    <Col sm="6">
                        <h1>Portfolio</h1>
                    </Col>
                    <Col sm="6">
                        <FilterSearch change={this.searchHandler} search={this.state.search} clear={this.filterHandler.bind(this, '')} />
                    </Col>
                </Row>
                <div className="portfolio">
                    <Row>
                        {filteredData}
                    </Row>
                    {loadMoreBtn}
                </div>
            </Aux>
        );
    }
}

export default withErrorHandler(ImportData, axios);