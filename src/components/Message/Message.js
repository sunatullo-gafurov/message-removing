import React from 'react'
import { MESSAGE_STATUS_FAIL, MESSAGE_STATUS_SENT } from '../../constants'

// Переиспользуемый компонент, не должен лазить в state
export default function Message({ item, onEdit, onResend, onDelete }) {
    const handleEdit = () => {
        onEdit(item);
    }

    const handleDelete = () => {
        onDelete(item.id)
    };

    const handleResend = () => {
        onResend(item);
    }

    return (
        <div>
            {item.status === MESSAGE_STATUS_SENT && <><button onClick={handleEdit}>✎</button><button onClick={handleDelete}>x</button></>}
            {item.status === MESSAGE_STATUS_FAIL && <button onClick={handleResend}>🗘</button>}
            <p>
                {item.content}
            </p>
            <p>
                {item.id}
            </p>
            <p>
                {item.status}
            </p>
        </div>
    )
}
