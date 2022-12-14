"use client";
import React from "react";
import ConintueWatching from "../../components/ConintueWatching";
import ContinueWatchingSkeleton from "../../components/continueWatchingSkeleton";
import Slider from "../../components/layout/Slider";

function page() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full h-full">
      <ContinueWatchingSkeleton />
    </div>
  );
}

export default page;
