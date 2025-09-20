"use client";
import GiscusComponent from "@giscus/react";
// @ts-expect-error
import PhoneMd from "./content.mdx";

export const Phone = () => {
  return (
    <div>
      <article className="prose prose-slate">
        <PhoneMd />
      </article>
      <div className="my-10">
        <GiscusComponent
          repo="Hacksore/Hacksore"
          repoId="MDEwOlJlcG9zaXRvcnkzNDExNDE2OTY"
          category="General"
          categoryId="DIC_kwDOEJiE_c4CSRHB"
          theme="dark"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          lang="en"
        />
      </div>
    </div>
  );
};
