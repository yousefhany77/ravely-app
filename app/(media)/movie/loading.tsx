import React from "react";

function loading() {
  return (
    <section>
      <div className="w-full h-screen bg-slate-700 relative animate-pulse opacity-60">
        <div className="absolute h-1/3 w-1/2 top-1/2 left-0 transform bg-slate-300 -translate-y-1/2 rounded-lg">
          <span className="block  border-b-8 w-1/2  m-6 border-light-gray rounded-lg opacity-40 "></span>
          <span className="block  border-b-4 w-1/2  m-6 border-gray-800 rounded-lg opacity-40 "></span>
        </div>
      </div>
    </section>
  );
}

export default loading;
