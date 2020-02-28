import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Message/Message';
import { messageEdit, messageDelete, messageSave, messagesFetch } from '../../actions/actionCreators';
import { useEffect } from 'react';

export default function MessagesList() {
    const { items, loading} = useSelector(state => state.messages.list);
    const dispatch = useDispatch(); // react-redux - dispatch - никогда не меняется

    useEffect(() => {
        dispatch(messagesFetch()); // first load (не ждём секунду)
    }, [dispatch]);

    useEffect(() => {
        // subscriptions (подписки)
        // Не использовать setInterval - если ответы будут медленными, то можно перетереть данные
        // const id = setInterval(() => {
        //     dispatch(messagesFetch());
        // }, 5000);
        // всегда возвращаем функцию unsubscribe (отписка)
        // return () => clearInterval(id);
        let id = 0;
        if (loading === false) {
            id = setTimeout(() => {
                dispatch(messagesFetch());
            }, 1000000000);
            return () => clearTimeout(id);
        }
    }, [dispatch, loading]); // dispatch - deps (всё, что используем снаружи)

    const handleEdit = item => {
        dispatch(messageEdit(item));
    };
    const handleDelete = id => {
        messageDelete(id, dispatch);
    };
    const handleResend = item => {
        messageSave(dispatch, item);
    };

    return (
        <div>
            <ul>
                {items.map(o => <li key={o.id}>
                    <Message item={o} onEdit={handleEdit} onResend={handleResend} onDelete={handleDelete} />
                </li>)}
            </ul>
        </div>
    )
}
