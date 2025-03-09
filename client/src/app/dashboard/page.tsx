import DashNav from '@/components/dashboard/DashNav';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomUser, CustomSession } from '../api/auth/[...nextauth]/options';
import CreateChat from '@/components/groupChat/CreateChat';

async function dashboard() {
    const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div>
        <DashNav name={session?.user?.name || ''} image={session?.user?.image ?? undefined} />
       <div className='container mx-auto'>
       <div className='flex justify-end mt-10'>
            <CreateChat user={session?.user!} />
        </div>
       </div>
    </div>
  )
}

export default dashboard;