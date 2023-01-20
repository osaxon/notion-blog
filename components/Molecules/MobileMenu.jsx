"use client";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileMenu({ links }) {
    return (
        <Menu as="div" className="relative ml-3">
            <Menu.Button className="text-black font-bold text-2xl inline-flex items-center justify-center p-2">
                <Bars3Icon className="bloc bg-primary rounded-full p-2 h-10 w-10" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute left-0 z-10 w-48 origin-top-right rounded-sm bg-white py-2 flex flex-col">
                    {links.length > 0 &&
                        links.map((l) => (
                            <Menu.Item key={l.title}>
                                {({ active }) => (
                                    <Link
                                        className={`p-1 text-lg font-bold font-mono text-zinc-900 ${
                                            active && "bg-primary-focus"
                                        }`}
                                        href={l.href}
                                    >
                                        {l.title}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
