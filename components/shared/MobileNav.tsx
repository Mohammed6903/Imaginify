"use client"
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { SignedIn, UserButton } from '@clerk/nextjs';

const MobileNav = () => {
    const pathname = usePathname();
  
    const mainNavLinks = navLinks.slice(0, -2);
    const bottomNavLinks = navLinks.slice(-2);

    return (
        <header className='fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center lg:hidden'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src="/assets/images/logo-text.svg" alt="Imaginify logo" width={130} height={20} />
            </Link>
            <nav className='flex items-center gap-4'>
                <SignedIn>
                    <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: 'h-10 w-10'
                            }
                        }}
                    />
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className='bg-purple-100 p-2 rounded-full'>
                                <Image src="/assets/icons/menu.svg" alt='menu' width={24} height={24} className='cursor-pointer'/>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className='sheet-content sm:w-80 pt-10'>
                            <SheetHeader className='mb-8'>
                                <Image src="/assets/images/logo-text.svg" alt='logo' width={152} height={23} />
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                <nav className='flex-1'>
                                    <ul className='space-y-3'>
                                        {mainNavLinks.map((link) => {
                                            const isActive = link.route === pathname;
                                            return (
                                                <li key={link.route}>
                                                    <Link 
                                                        href={link.route}
                                                        className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                                                            isActive 
                                                            ? 'bg-purple-gradient text-white' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        <Image src={link.icon} alt={link.label} width={24} height={24} className={isActive ? 'brightness-200' : ''} />
                                                        <span>{link.label}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <div className="mt-auto border-t pt-4">
                                    <ul className='space-y-3'>
                                        {bottomNavLinks.map((link) => {
                                            const isActive = link.route === pathname;
                                            return (
                                                <li key={link.route}>
                                                    <Link 
                                                        href={link.route}
                                                        className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                                                            isActive 
                                                            ? 'bg-purple-gradient text-white' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        <Image src={link.icon} alt={link.label} width={24} height={24} className={isActive ? 'brightness-200' : ''} />
                                                        <span>{link.label}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
            </nav>
        </header>
    )
}

export default MobileNav;