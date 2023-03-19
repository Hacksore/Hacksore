import { Button } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";

function Custom404() {
  return (
    <>
      <h1 style={{ fontSize: 100, margin: 0 }}>404</h1>
      <h3>
        <Link href="/">
          <Button
            variant="contained"
            color="primary"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontSize: 30,
            }}
          >
            Go Home
          </Button>
        </Link>
      </h3>
      <Image src="/img/doge.png" alt="doge" width={600} height={600} />
    </>
  );
}

export default Custom404;
