"use client";
import React, { useEffect, useState } from "react";
import { BsPlayFill, BsSquare } from "react-icons/bs";
import Typewriter from "typewriter-effect";

function VideoFeature({ text }: { text: string }) {
  const [show, SetShow] = useState(false);
  useEffect(() => {
    SetShow(true);
  }, []);
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-700 relative flex flex-col items-center justify-center">
      <div>
        {show && (
          <p className="text-white font-bold text-2xl ">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                strings: [text],
              }}
            />
          </p>
        )}
      </div>
        {/* player */}
      <div className="h-10 w-full bg-gray-800 absolute bottom-0 flex justify-between items-center gap-2 px-3">
        <BsPlayFill size={25} className="text-white mx-2" />
        <div className="flex-grow w-full h-2 bg-gray-900 rounded-full">
          <div className="videoPlayer-Animation h-full bg-red rounded-full" />
        </div>
        <p className="ml-2">🔊</p>
        <BsSquare size={20} className="text-white mx-2" />
      </div>
    </div>
  );
}

export default VideoFeature;
