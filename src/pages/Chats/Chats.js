import React from 'react'
import Page from '../../layouts/Page/Page'
import ChannelsList from '../../components/ChannelsList/ChannelsList'
import MessageArea from '../../components/MessageArea/MessageArea'

export default function Chats() {
    return (
        <Page
            sidebar={<ChannelsList />}
            main={<MessageArea />}
        />
    )
}
