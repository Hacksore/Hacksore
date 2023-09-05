import "../styles/global.css";

import { Roboto } from "next/font/google";
import { Header } from "../components/header";
import Providers from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <Header />
          <main className={`${roboto.className} max-w-3xl mx-auto`}>
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
