"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfinityScroll from "react-infinite-scroll-component"
import Post from "./Post";

const fetchPosts = async ({ pageParam = 1, userProfileId }: { pageParam: number, userProfileId?: string }) => {
  const res = await fetch(`http://localhost:3000/api/posts?cursor=${pageParam}&user=${userProfileId || ""}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json(); // must return { posts: [...], hasMore: boolean }
};

const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", userProfileId],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, userProfileId }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading posts: {(error as Error).message}</div>;
  console.log("content",data)

 const allPosts=data?.pages?.flatMap(page=>page.posts)||[]


  return (
      <InfinityScroll dataLength={allPosts.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={<h1>Posts are loading ...</h1>} endMessage={<h1>All posts loaded!</h1>}>
       {allPosts.map(post=>(<Post post={post} key={post.id}/>))}
      </InfinityScroll>
  );
};

export default InfiniteFeed;
