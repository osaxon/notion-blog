import React from "react";
import Image from "next/image";

const BuyMeACoffee = () => {
    return (
        <button className="btn w-full border-0 bg-[#FF813F] text-[#FFFFFF] hover:bg-[#FF813F] hover:bg-opacity-80">
            <Image
                alt="Buy me a coffee logo image"
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                width={24}
                height={24}
                className="align-middle"
            />
            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.buymeacoffee.com/oliandgio"
                className=""
            >
                <span className="ml-1 inline-flex items-center align-middle text-sm font-bold">
                    Buy me a Beer!
                </span>
            </a>
        </button>
    );
};

export default BuyMeACoffee;
