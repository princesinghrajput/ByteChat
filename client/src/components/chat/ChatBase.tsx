"use client"
import { getSocket } from '@/lib/socket.config';
import React, {useEffect, useMemo} from 'react'
import {v4 as uuidv4} from 'uuid';
import { Button } from '../ui/button';

const ChatBase = () => {
    let socket = useMemo(()=>{
        const socket = getSocket();
        return socket.connect();
    }, []);


    useEffect(()=>{
        socket.on("message", (data: any)=>{
            console.log("The socket message is..", data);
        })

        return ()=>{
            socket.close();
        }
    }, [])

    const handleClick = () =>{
        const uniqueId = uuidv4();
        socket.emit("message", {
            name:"Prince",
            id: uniqueId,
            message: "Hello from client",
        });
    }

  return (
    <div>
        <Button onClick={handleClick}>Send Message</Button>
    </div>
  )
}

export default ChatBase;