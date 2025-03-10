import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

function Chat({params}: {params: {id: string}}) {
    console.log("group id", params.id)
  return (
    <div>
        <h1>Hello from chat page</h1>
        <ChatBase />
    </div>

  )
}

export default Chat