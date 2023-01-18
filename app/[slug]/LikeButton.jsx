"use client";
import { FiHeart } from "react-icons/fi";
import useContentMeta from "@/hooks/useContentMeta";
import { useEffect } from "react";

const LikeButton = ({ slug }) => {
  const { likes, addLike } = useContentMeta(slug);

  useEffect(() => {
    console.log(likes);
  }, [likes]);

  return (
    <div className="flex items-center space-x-4">
      <button onClick={addLike}>
        <FiHeart size={36} />
      </button>
      {likes}
    </div>
  );
};

export default LikeButton;
