import React from "react";

function loading() {
  return (
    <section>
      <div className="w-full h-screen bg-red relative">
        <div className="absolute w-1/2 top-1/2 left-1/2 transform bg-light-gray -translate-x-1/2 -translate-y-1/2">
          <span className="block  border-b-8 w-1/2  m-6 border-light-gray "></span>
          <span className="block  border-b-4 w-1/2  m-6 border-gray-300 "></span>
        </div>
      </div>
    </section>
  );
}

export default loading;
