import React from "react";

export const ContainerSizes = () => {
  return (
    <div className="flex gap-2">
      <p>Container size:</p>
      <p className="hidden @sm:block @md:hidden @lg:hidden @xl:hidden">@sm</p>
      <p className="hidden @md:block @lg:hidden">@md</p>
      <p className="hidden @lg:block @md:hidden @xl:hidden">@lg</p>
      <p className="hidden @xl:block @md:hidden @lg:hidden">@xl</p>
    </div>
  );
};

export const ScreenSizes = () => {
  return (
    <div className="flex gap-2">
      <p>Screen size:</p>
      <p className="sm:hidden md:hidden lg:hidden xl:hidden">xs</p>
      <p className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</p>
      <p className="hidden md:block lg:hidden">md</p>
      <p className="hidden lg:block md:hidden xl:hidden">lg</p>
      <p className="hidden xl:block md:hidden lg:hidden">xl</p>
    </div>
  );
};
