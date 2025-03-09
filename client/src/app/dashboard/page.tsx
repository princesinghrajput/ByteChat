import DashNav from '@/components/dashboard/DashNav';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';

async function dashboard() {
    const session: CustomSession | null = await getServerSession(authOptions);

    {JSON.stringify(session)}
  return (
    <div>
        <DashNav name={session?.user?.name || ''} image={session?.user?.image ?? undefined} />
    </div>
  )
}

export default dashboard;