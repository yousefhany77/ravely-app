import React from "react";

function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center animate-pulse opacity-50">
      <div className="w-4/6 max-w-7xl bg-darkest overflow-hidden  grid md:grid-cols-[1fr_2fr] rounded-2xl   border border-light-gray/50">
        <div className="ww-full bg-darkest"></div>
        <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 via-red to-rose-400 w-full"></div>
      </div>
    </div>
  );
}

export default loading;
