import React from "react";

interface Props {
  children: React.ReactNode;
}
function layout({ children }: Props) {
  return <div className="bg-red "> 
  <h2>Hello mother fucker</h2>
  {children}
  </div>;
}

export default layout;
