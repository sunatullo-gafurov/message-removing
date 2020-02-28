import React from 'react'
import MessagesList from '../MessagesList/MessagesList';
import MessageEditForm from '../MessageEditForm/MessageEditForm';

export default function MessageArea() {
    return (
        <div>
            <MessagesList />
            <MessageEditForm />
        </div>
    )
}
