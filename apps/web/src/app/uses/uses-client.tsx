"use client";
import { useState } from "react";

// @ts-ignore
import Mac from "../../mdx/mac.mdx";
// @ts-ignore
import PC from "../../mdx/pc.mdx";
// @ts-ignore
import Shared from "../../mdx/shared.mdx";
import Head from "next/head";
import GiscusComponent from "@giscus/react";

const platformComponents = {
  pc: PC,
  mac: Mac,
};

function Uses() {
  const [platform, setPlatform] = useState<"mac" | "pc">("mac");
  const PlatformComponent = platformComponents[platform];

  return (
    <div>
      <Head>
        <title>Sean Boult /uses</title>
      </Head>

      <div className="prose content">
        <Shared />

        <PlatformComponent />

        <p>Questions about something I use or build please drop a comment below or @ me on twitter.</p>

        <p>
          Also make sure to check out my{" "}
          <a
            href="https://github.com/Hacksore/dotfiles/tree/master/.config/astronvim/lua/user"
            rel="noreferrer"
            target="_blank"
          >
            Neovim config
          </a>{" "}
          and{" "}
          <a href="https://github.com/Hacksore/dotfiles" rel="noreferrer" target="_blank">
            dotfiles
          </a>{" "}
          to see how I configure everything.
        </p>

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
}

export default Uses;
