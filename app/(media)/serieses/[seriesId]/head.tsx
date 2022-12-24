import React from "react";
import DefaultTags from "../../../../components/DefaultTags";

function Head({ title }: { title: string }) {
  return (
    <>
    <DefaultTags/>
      <title>{title}</title>
    </>
  );
}

export default Head;
