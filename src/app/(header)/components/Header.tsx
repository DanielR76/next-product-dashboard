'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { useAuth } from '@hooks';
import { NavigationItems } from '@molecules';
import { Paths } from '@constants';
import Image from 'next/image';

export const Header = () => {
  const pathname = usePathname();
  const {
    authData: { data },
    logoutUser,
  } = useAuth();

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  {data && (
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <NavigationItems />
                      </div>
                    </div>
                  )}
                </div>

                {data && (
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="rounded-full"
                              src={data?.avatar}
                              alt="avatar"
                              width={32}
                              height={32}
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <button
                              className="block px-4 py-2 text-sm text-gray-700"
                              onClick={logoutUser}
                            >
                              Logout
                            </button>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                )}

                {!data && pathname !== Paths.Login && (
                  <Link
                    href={Paths.Login}
                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    Login
                  </Link>
                )}

                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>

                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {data && (
              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <NavigationItems />
                </div>

                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={data?.avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </div>

                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {data?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {data?.email}
                      </div>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
};
