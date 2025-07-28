"use client";

import { followUser } from "@/action";
import { socket } from "@/socket";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
  username,
}: {
  userId: string;
  isFollowed: boolean;
  username: string;
}) => {
  const [state, setState] = useState(isFollowed);
  const { user } = useUser();

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );

  if (!user) return null;

  const followAction = async () => {
    switchOptimisticFollow("");
    await followUser(userId);
    setState((prev) => !prev);
    socket.emit("sendNotification", {
      receiverUsername: username,
      data: {
        senderUsername: user.username,
        type: "follow",
        link: `/${user.username}`,
      },
    });
  };

  return (
    <form action={followAction}>
      <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
};

export default FollowButton;
