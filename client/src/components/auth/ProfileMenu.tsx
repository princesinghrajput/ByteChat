"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/common/UserAvatar";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import('../auth/LogoutModal'), { ssr: false });
function ProfileMenu({ name, image }: { name?: string; image?: string }) {
    const [open, setOpen] = useState(false);
  return (
    <>
    {open && <Suspense fallback={<p>Loading...</p>}><LogoutModal open={open} setOpen={setOpen} /></Suspense>}
      <DropdownMenu >
        <DropdownMenuTrigger>
          <UserAvatar name={name || ''} image={image || ''} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ProfileMenu;
