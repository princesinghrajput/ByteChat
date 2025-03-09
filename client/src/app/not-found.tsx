import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <Image src="/images/404.svg" alt="Not Found" width={500} height={500} />

        <Link href="/">
            <Button>Go to Home</Button>
        </Link>
    </div>
  );
}

export default NotFound;
