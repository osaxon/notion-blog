"use client";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function MobileMenu({ links }) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center justify-center py-2">
                <Bars3Icon className="bloc h-10 w-10 rounded-full p-2 text-primary" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="z-99 absolute left-0 flex w-48 origin-top-right flex-col rounded-sm bg-white py-2 backdrop-blur-lg">
                    {links.length > 0 &&
                        links.map((l) => (
                            <Menu.Item key={l.title}>
                                {({ active }) => (
                                    <Link
                                        className={`p-1 font-mono text-lg font-bold text-base-content ${
                                            active &&
                                            "bg-primary-focus bg-opacity-75"
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
