import { MESSAGE_CHANGE, MESSAGE_SAVE_REQUEST, MESSAGE_SAVE_SUCCESS, MESSAGE_SAVE_FAILURE, MESSAGES_SAVE_MESSAGE, MESSAGES_MESSAGE_STATUS_CHANGE, MESSAGE_EDIT, MESSAGES_FETCH_REQUEST, MESSAGES_FETCH_SUCCESS, MESSAGES_FETCH_FAILURE, MESSAGE_DELETE_REQUEST, MESSAGE_DELETE_SUCCESS } from "./actionTypes";
import nanoid from 'nanoid';
import { MESSAGE_STATUS_SENT, MESSAGE_STATUS_FAIL, MESSAGE_STATUS_PENDING } from "../constants";
import client from '../http'; // index.js писать не нужно

export const messagesFetchRequest = () => {
    return {
        type: MESSAGES_FETCH_REQUEST,
        payload: {}
    }
}
export const messagesFetchSuccess = items => {
    return {
        type: MESSAGES_FETCH_SUCCESS,
        payload: { items }
    }
}
export const messagesFetchFailure = error => {
    return {
        type: MESSAGES_FETCH_FAILURE,
        payload: { error }
    }
}
// 1. Вариант - попросить lastSeenId в параметры
// 2. Вариант - вытаскивать из store
export const messagesFetch = () => async (dispatch, getState) => {
    const { lastSeenId } = getState().messages.list;
    dispatch(messagesFetchRequest())
    try {
        const { data } = await client.get('/messages', { params: { lastSeenId } }); // теперь .json() или JSON.parse() делать не нужно
        dispatch(messagesFetchSuccess(data)); // response - целиком ответ, data - данные тела
    } catch (e) {
        dispatch(messagesFetchFailure(e));
    }
}

export const messagesSaveMessage = item => {
    return {
        type: MESSAGES_SAVE_MESSAGE,
        payload: { item },
    }
}

export const messagesMessageStatusChange = (id, status) => {
    return {
        type: MESSAGES_MESSAGE_STATUS_CHANGE,
        payload: { id, status },
    }
}

export const messageEdit = item => {
    return {
        type: MESSAGE_EDIT,
        payload: { item }
    };
}

export const messageDeleteRequest = () => {
    return {
        type: MESSAGE_DELETE_REQUEST,
        payload: {}
    };
};

export const messageDeleteSuccess = id => {
    return {
        type: MESSAGE_DELETE_SUCCESS,
        payload: {
            id
        }
    };
};

export const  messageDelete = async (id, dispatch) => {
    dispatch(messageDeleteRequest());
    try {
        await client.delete(`/messages/${id}`);
        dispatch(messageDeleteSuccess(id))
    } catch (e) {
        console.log(e);
    }
};

export const messageChange = ({ content }) => {
    return {
        type: MESSAGE_CHANGE,
        payload: { content }
    };
}

export const messageSaveRequest = () => {
    return {
        type: MESSAGE_SAVE_REQUEST,
        payload: {}
    }
}

export const messageSaveSuccess = () => {
    return {
        type: MESSAGE_SAVE_SUCCESS,
        payload: {}
    }
}

export const messageSaveFailure = error => {
    return {
        type: MESSAGE_SAVE_FAILURE,
        payload: {
            error
        }
    }
}

// thunk:
// action creator = (аргументы) => (dispatch, getState) => { ... }

//export const messageSave = async (dispatch, item) => {
export const messageSave = item => async dispatch => {
    dispatch(messageSaveRequest()); // SAVE_REQUEST

    const itemToSave = {
        ...item,
        id: item.id === '' ? nanoid() : item.id, // item.id || nanoid()
        status: MESSAGE_STATUS_PENDING,
        created: Date.now(),
    }; // Date - built-in class, static method
    dispatch(messagesSaveMessage(itemToSave));

    /* вместо
    try {
        const response = await fetch();
        if (!response.ok) {
            throw new Error();
        }
        const data = response.json();
    } catch (e) {
        console.log(e);
    }
    */

    // с axios
    try {
        await client.post('/messages', itemToSave); // теперь .json() или JSON.parse() делать не нужно
        dispatch(messagesMessageStatusChange(itemToSave.id, MESSAGE_STATUS_SENT));
    } catch (e) {
        console.log(e);
        dispatch(messagesMessageStatusChange(itemToSave.id, MESSAGE_STATUS_FAIL));
    }
}