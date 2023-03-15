import React from "react";
import siteConfig from "../site.config";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bottom-0 bg-primary py-10">
            <div className="layout flex justify-between text-white">
                <nav>
                    <h5 className="text-lg">Sitemap:</h5>
                    <ul className="text-lg">
                        {siteConfig.navMenu.map((item) => (
                            <li key={item.id}>
                                <Link
                                    className="hover:underline"
                                    href={item.href}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <h5>Contact:</h5>
                    <p>Oli Saxon</p>
                    <p>Email: oliverrsaxon@gmail.com</p>
                    <p>Tel: 07983970095</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
