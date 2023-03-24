import React from "react";

const SectionHeader = ({ text }) => {
    return (
        <h2 className="mb-2 bg-primary text-4xl font-bold text-base-100">
            {`/// ${text}`}
        </h2>
    );
};

export default SectionHeader;
