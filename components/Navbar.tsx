'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GithubIcon from './github-icon';
import { login, logout } from '@/lib/auth-actions';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={'/'} className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-2xl font-bold text-gray-800">Travel Planner</span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href={'/trips'} className="text-slate-900 hover:text-sky-500">
                My trips
              </Link>
              <Link href={'/globe'} className="text-slate-900 hover:text-sky-500">
                Globe
              </Link>

              <button
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
                onClick={() => logout()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
              onClick={() => login()}
            >
              Sign In <GithubIcon className="w-6 h-6 ml-2" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
