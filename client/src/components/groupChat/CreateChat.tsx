"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateChatSchema,
  createChatSchema,
} from "@/validations/groupChatValidation";
import { Input } from "../ui/input";
import { User } from "next-auth";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";
function CreateChat({user}: {user: CustomUser}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatSchema>({
    resolver: zodResolver(createChatSchema),
  });


  const onSubmit = async (data: CreateChatSchema) => {
    try {
      setLoading(true);
      const response = await axios.post(CHAT_GROUP_URL, {...data, userId: user.id}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if(response?.data?.message) {
        toast.success(response?.data?.message);
      }
      setLoading(false);
      toast.success("Chat group created successfully");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to create chat group. Please try again.");
      } else {
        toast.error("Failed to create chat group. Please try again.");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Your New Chat Group</DialogTitle>
          <DialogDescription>
            Create a new chat group to start chatting with your friends.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-col gap-4">
            <Input {...register("title")} placeholder="Title" />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <Input {...register("passcode")} placeholder="Passcode" />
            {errors.passcode && (
              <p className="text-red-500">{errors.passcode.message}</p>
            )}
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChat;
