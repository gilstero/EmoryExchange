import React from "react";
import { Link } from "react-router-dom";

interface TagProps {
  tag?: string;
}

export default function Tag({ tag }: TagProps) {
  tag = "Tutoring";
  return (
    <div className="flex justify-center items-center bg-[#34b7eb] text-sm font-semibold p-2 rounded-full inline-block">
      {tag}
    </div>
  );
}
