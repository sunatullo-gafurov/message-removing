import { combineReducers } from "redux";
import { MESSAGE_CHANGE, MESSAGE_SAVE_REQUEST, MESSAGES_SAVE_MESSAGE, MESSAGES_MESSAGE_STATUS_CHANGE, MESSAGE_EDIT, MESSAGES_FETCH_REQUEST, MESSAGES_FETCH_SUCCESS, MESSAGES_FETCH_FAILURE, MESSAGE_DELETE_REQUEST, MESSAGE_DELETE_SUCCESS } from "../actions/actionTypes";
import { MESSAGE_STATUS_PENDING } from "../constants";

const initialListState = {
    items: [],
    loading: false,
    error: null,
    lastSeenId: '', // какой последний id мы видели
};

// state <- list
export function messagesListReducer(state = initialListState, action) {
    // TODO: handle action
    switch (action.type) {
        // action проходит через все reducer'ы (можно сделать и так, но это часто приводит к ошибкам)
        // case MESSAGE_SAVE_SUCCESS: {
        //     console.log('received');
        // }
        case MESSAGES_FETCH_REQUEST: {
            return { ...state, loading: true, error: null };
        }
        case MESSAGES_FETCH_SUCCESS: {
            const { items } = action.payload;
            const ids = items.map(o => o.id);
            let last;
            if (items.length !== 0) {
                last = items[items.length - 1];
            }
            const lastSeen = last && last.id;
            const lastSeenId = lastSeen || state.lastSeenId; // только для собеседования
            // 1. Не добавлять те элементы, которые уже есть
            // 2. Сделать удаление (пусть автоматически у других не удаляется) - удаляется только у вас
            console.log(items);
            return { ...state, items: [...state.items.filter(o => !ids.includes(o.id)), ...items], loading: false, error: null, lastSeenId }; // TODO: Заменять всё плохо
        }
        case MESSAGES_FETCH_FAILURE: {
            const { error } = action.payload;
            return { ...state, loading: false, error };
        }
        case MESSAGES_SAVE_MESSAGE: {
            const { item } = action.payload;
            // TODO: handle edit of existing item
            const existing = state.items.find(o => o.id === item.id);
            if (existing === undefined) {
                return { ...state, items: [...state.items, item] };
            }
            return { ...state, items: state.items.map(o => o.id === item.id ? item : o) };
        }
        case MESSAGES_MESSAGE_STATUS_CHANGE: {
            const { id, status } = action.payload;
            return { ...state, items: state.items.map(o => o.id === id ? { ...o, status } : o) };
        }
        case MESSAGE_DELETE_REQUEST:
            return {...state, loading: true, error: null};
        case MESSAGE_DELETE_SUCCESS:
            return {...state, items: state.items.filter(o => o.id !== action.payload.id), loading: false, error: null};
        default:
            return state;
    }

   
}

const initialEditState = {
    item: {
        id: '',
        content: '',
        // type <- TODO: file uploading
        status: MESSAGE_STATUS_PENDING,
        created: 0,
    },
    loading: false,
    error: null,
}

// 1. Status Component -> часики, галочка, воскл.знак
// 2. Если воскл.знак - тогда должна появиться кнопка Resend
// 3. Из формы вырезать всё ненужное
// 4. Добавить кнопку редактирования
// 5. Оформить сообщения

// state <- edit
export function messageEditReducer(state = initialEditState, action) {
    switch (action.type) {
        case MESSAGE_EDIT: {
            const { item } = action.payload;
            return { ...state, item };
        }
        case MESSAGE_CHANGE: {
            const { content } = action.payload;
            return { ...state, item: { ...state.item, content } };
        }
        case MESSAGE_SAVE_REQUEST: {
            // сразу вычищаем поле ввода как в Telegram
            return { item: { ...initialEditState.item }, loading: true, error: null };
        }
        default:
            return state;
    }

    
}

/*
messages: {
    list: { <- messagesListReducer
        items: [],
        loading: false,
        error: null,
    },
    edit: { <- messageEditReducer
        item: {...},
        loading: false,
        error: null,
    }
}
*/

const messagesReducer = combineReducers({
    list: messagesListReducer,
    edit: messageEditReducer,
});

export default messagesReducer;