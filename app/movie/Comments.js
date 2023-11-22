"use client";

import Giscus from "@giscus/react";
import React from "react";

const Comments = () => {
  return (
    <div className=" max-h-[40rem] overflow-scroll rounded-lg border p-6">
      <Giscus
        id="comments"
        repo="Azazali009/test"
        repoId="R_kgDOKwek8Q"
        category="Announcements"
        categoryId="DIC_kwDOKwek8c4CbJGT"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="cobalt"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default Comments;
