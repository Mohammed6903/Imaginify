'use client'
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../ui/button';

const Sidebar = () => {
  const pathname = usePathname();
  
  const mainNavLinks = navLinks.slice(0, -2);
  const bottomNavLinks = navLinks.slice(-2);

  return (
    <aside className='sidebar flex flex-col justify-between h-screen'>
      <div className="flex flex-col gap-4">
        <Link href="/" className="sidebar-logo flex justify-center items-center p-4">
          <Image 
            src="/assets/images/logo-text.svg" 
            alt="Imaginify logo" 
            width={180} 
            height={28} 
            className="rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </Link>
        <nav className='flex-1'>
          <SignedIn>
            <ul className='space-y-2'>
              {mainNavLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li key={link.route}>
                    <Link 
                      href={link.route}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-purple-gradient text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Image src={link.icon} alt={link.label} width={24} height={24} className={isActive ? 'brightness-200' : ''} />
                      <span className='hidden md:inline'>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </SignedIn>
        </nav>
      </div>
      
      <div className="mt-auto">
        <SignedIn>
          <ul className='space-y-2'>
            {bottomNavLinks.map((link) => {
              const isActive = link.route === pathname;
              return (
                <li key={link.route}>
                  <Link 
                    href={link.route}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-purple-gradient text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Image src={link.icon} alt={link.label} width={24} height={24} className={isActive ? 'brightness-200' : ''} />
                    <span className='hidden md:inline'>{link.label}</span>
                  </Link>
                </li>
              )
            })}
            <li className="p-4">
              <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '3rem',
                        height: '3rem',
                      },
                      userButton: {
                        backgroundColor: 'transparent',
                      },
                      userButtonMenu: {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                  showName
                >
                  {/* <UserButton.MenuItems>
                    <UserButton.Action
                      label="Open chat"
                      labelIcon={<DotIcon />}
                      onClick={() => alert('init chat')}
                    />
                    <UserButton.Link
                      label="Create organization"
                      labelIcon={<DotIcon />}
                      href="/create-organization"
                    />
                  </UserButton.MenuItems> */}
              </UserButton>
            </li>
          </ul>
        </SignedIn>

        <SignedOut>
          <Button asChild className='w-full bg-purple-gradient bg-cover'>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </div>
    </aside>
  )
}

export default Sidebar;