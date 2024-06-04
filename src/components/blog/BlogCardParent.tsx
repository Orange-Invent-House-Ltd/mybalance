import React, { useEffect, useState } from "react";
import BlogButton from "./BlogButton";
import Card from "./BlogCard";
import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "../reuseable/LoadingOverlay";

interface BlogItem {
  id: string;
  title: string;
  content: string;
  readingTime: number;
  coverImageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

function BlogCardParent() {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState("hidden");
  const { data, isLoading, isFetching } = useBlogs();
  const blogData = data?.data;
  //

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setOverflow(expanded ? "hidden" : "visible");
  };

  return (
    <div>
      {isLoading && isFetching ? (
        <LoadingOverlay />
      ) : (
        <div className="transition-all duration-700 ease-in-out">
          <div
            className={`mt-[-170px] md:mt-[-200px]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-8 md:px-14 ${
              expanded ? "h-auto" : "h-[38rem]"
            } overflow-${overflow} hover:cursor-pointer`}
          >
            {blogData?.map((blog: BlogItem) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}/details`}
                state={{ blogData: blog }}
              >
                <Card data={blog} key={blog.id} />
              </Link>
            ))}
          </div>
          <BlogButton onClick={toggleExpanded} expanded={expanded} />
        </div>
      )}
    </div>
  );
}

export default BlogCardParent;
