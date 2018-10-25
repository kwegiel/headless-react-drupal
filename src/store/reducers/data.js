import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    data: null,      
    loading: false
};

const fetchPageStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchPageSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        loading: false
    });
};

const fetchPageFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAGE_START: return fetchPageStart(state, action);
        case actionTypes.FETCH_PAGE_SUCCESS: return fetchPageSuccess(state, action);
        case actionTypes.FETCH_PAGE_FAIL: return fetchPageFail(state, action);
        default: return state;
    }
};

export default reducer;