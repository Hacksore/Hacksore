import "../styles/global.css";

import { Header } from "../components/header";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <Header />
          <main className="max-w-3xl mx-auto">
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
