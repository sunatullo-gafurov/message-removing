import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import channelsReducer from "../reducers/channels";
import messagesReducer from "../reducers/messages";
import thunk from "redux-thunk";

/*
state = { <- reducer
    channels <- channelsReducer
    messages <- messageReducer
    auth <- authReducer
}
*/

const reducer = combineReducers({
    channels: channelsReducer,
    messages: messagesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    // включает Redux Dev Tools
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
