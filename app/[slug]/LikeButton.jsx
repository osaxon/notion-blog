"use client";
import { FiHeart } from "react-icons/fi";
import useContentMeta from "@/hooks/useContentMeta";
import { useEffect } from "react";

const LikeButton = ({ slug }) => {
  const { likes, addLike } = useContentMeta(slug);

  return (
    <div className="flex items-center space-x-4">
      <button className="overflow-hidden" onClick={addLike}>
        <FiHeart className="bg-transparent fill-black" size={36} />
      </button>
      {likes}
    </div>
  );
};

export default LikeButton;
