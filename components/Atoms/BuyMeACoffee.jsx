import React from "react";
import Image from "next/image";

const BuyMeACoffee = () => {
    return (
        <a
            target="_blank"
            rel="noreferrer"
            href="https://www.buymeacoffee.com/oliandgio"
            className="inline-flex bg-[#FF813F] text-[#FFFFFF] hover:shadow-md rounded-md px-3 py-2 h-12"
        >
            <Image
                alt="Buy me a coffee logo image"
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                width={24}
                height={24}
                className="align-middle"
            />
            <span className="ml-3 inline-flex items-center lg:text-lg text-sm font-bold align-middle">
                Buy me a Beer!
            </span>
        </a>
    );
};

export default BuyMeACoffee;
