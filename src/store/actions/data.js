import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchPageSuccess = (pages) => {
    return {
        type: actionTypes.FETCH_PAGE_SUCCESS,
        data: pages
    };
};

export const fetchPageFail = (error) => {
    return {
        type: actionTypes.FETCH_PAGE_FAIL,
        error: error
    };
};

export const fetchPageStart = () => {
    return {
        type: actionTypes.FETCH_PAGE_START
    };
};

export const fetchPage = () => {
    return dispatch => {
        dispatch(fetchPageStart());
        axios.get('/node/page')
            .then(res => {                
                const resData = res.data.data;               
                const fetchedPage = resData.map(item => {
                    return {
                        id: item.id,
                        title: item.attributes.title,
                        path: item.attributes.path.alias,
                        body: item.attributes.body
                    }
                });
                dispatch(fetchPageSuccess(fetchedPage));
            })
            .catch(err => {
                dispatch(fetchPageFail(err));
            });
    };
};