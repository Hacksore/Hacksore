import "../styles/global.css";

import { Roboto } from "next/font/google";
import { Header } from "../components/header";
import Providers from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <Header />
          <main className={`${roboto.className} max-w-3xl my-10 mx-auto`}>
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
