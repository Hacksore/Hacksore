"use client";
import GiscusComponent from "@giscus/react";

export function GuestBook() {
  return (
    <div>
      <div>
        <GiscusComponent
          repo="Hacksore/Hacksore"
          repoId="MDEwOlJlcG9zaXRvcnkzNDExNDE2OTY"
          category="General"
          categoryId="DIC_kwDOEJiE_c4CSRHB"
          theme="dark"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
        />
      </div>
    </div>
  );
}
