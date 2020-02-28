import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { messageChange, messageSave } from '../../actions/actionCreators';

export default function MessageEditForm() {
    // react-redux:
    // - useSelector -> позволяет выбирать кусочек state
    // - useDispatch -> позволяет получать dispatch
    const { item, loading, error } = useSelector(state => state.messages.edit);
    const dispatch = useDispatch();

    const handleSubmit = evt => {
        evt.preventDefault();
        // messageSave(dispatch, item);
        dispatch(messageSave(item)); // благодаря redux thunk
    };

    const handleChange = evt => {
        const { value } = evt.target;
        dispatch(messageChange({ content: value }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={item.content} />
            <button>Ok</button>
        </form>
    )
}
