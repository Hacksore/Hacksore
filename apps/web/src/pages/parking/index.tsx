import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function Login() {
  const { data: session } = useSession();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {session ? (
        <>
          <h3>Signed in as {session?.user?.email}</h3>
          You can now register a vehicle if you have not yet.
          <Link href="/parking/create">
            <Button variant="contained">Register Vehicle</Button>
          </Link>
          <Link href="/parking/vehicles">
            <Button variant="contained">View Vehicles</Button>
          </Link>
          <Link href="/parking/admin">
            <Button variant="contained">Admin</Button>
          </Link>
          <Button onClick={() => signOut()} variant="outlined" color="error">
            Sign out
          </Button>
        </>
      ) : (
        <div>
          <h2>Please sign in to register your vehicle</h2>
          {/* <div>
            <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
          </div> */}
          <div>
            <Button variant="contained" onClick={() => signIn("google")}>Sign in with Google</Button>
          </div>
        </div>
      )}
    </Box>
  );
}

export default Login;
