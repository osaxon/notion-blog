import React from "react";

const Emoji = ({ symbol, label = "" }, props) => {
  return (
    <span
      className="text-2xl"
      role="img"
      aria-label={label}
      aria-hidden={label ? false : true}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
