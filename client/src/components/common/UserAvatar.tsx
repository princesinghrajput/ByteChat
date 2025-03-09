import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserAvatar({name, image}: {name: string, image: string}) {
  return (
 <Avatar>
    <AvatarImage src={image} />
    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar