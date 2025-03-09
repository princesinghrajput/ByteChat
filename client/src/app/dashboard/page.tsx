import DashNav from '@/components/dashboard/DashNav';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomUser, CustomSession } from '../api/auth/[...nextauth]/options';
import CreateChat from '@/components/groupChat/CreateChat';
import { fetchGroupChat } from '@/fetch/groupFetch';
import GroupChatCard from '@/components/groupChat/GroupChatCard';
import { ChatGroupType } from '@/types/types';
async function dashboard() {
    const session: CustomSession | null = await getServerSession(authOptions);
    const user = session?.user as CustomUser;
    const groups = await fetchGroupChat(user.token!);
    const group = groups?.chatGroups;

  return (
    <div>
        <DashNav name={session?.user?.name || ''} image={session?.user?.image ?? undefined} />
       <div className='container mx-auto'>
       <div className='flex justify-end mt-10'>
            <CreateChat user={session?.user!} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {group.map((group:ChatGroupType) => (
                <GroupChatCard key={group.id} group={group} user={user} />
            ))}
        </div>
       </div>
    </div>
  )
}

export default dashboard;