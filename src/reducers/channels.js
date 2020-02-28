import { combineReducers } from "redux";

const initialListState = {
    items: [],
    loading: false,
    error: null,
};

// state <- list
export function channelsListReducer(state = initialListState, action) {
    return state;
}

/*
channels: {
    list: { <- channelsListReducer
        items: [],
        loading: false,
        error: null,
    },
    edit: { <- channelEditReducer
        item: {...},
        loading: false,
        error: null,
    }
}
*/

const channelsReducer = combineReducers({
    list: channelsListReducer,
    // edit: channelEditReducer,
});

export default channelsReducer;