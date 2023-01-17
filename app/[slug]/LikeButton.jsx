"use client";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useFetchPage } from "@/hooks/queryHooks";

const LikeButton = ({ currentLikes, postId }) => {
  const { data, status, refetch } = useFetchPage(postId);
  const [likes, setLikes] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setLikes(data?.properties.Likes.number);
  }, [setLikes, data]);

  const handleClick = (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    setDisabled(true);
    fetch("http://localhost:3000/api/notion/like-post", {
      method: "POST",
      body: JSON.stringify({ currentLikes, postId }),
    });
    refetch();
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error</p>
  ) : (
    <button
      className="flex items-center"
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      <FiHeart size={28} />
      {disabled ? (
        <p className="italic font-mono">Thanks!</p>
      ) : (
        <p className="italic font-mono">{likes}</p>
      )}
    </button>
  );
};

export default LikeButton;
