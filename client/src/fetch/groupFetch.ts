import axios from "axios";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";
import { CreateChatSchema } from "@/validations/groupChatValidation";

export async function fetchGroupChat(token: string) {
    const response = await axios.get(CHAT_GROUP_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    if(response.status !== 200) {
        throw new Error("Failed to fetch chat groups");
    }

    const data = await response.data;
    if(data){
        return data;
    }
    return [];

}