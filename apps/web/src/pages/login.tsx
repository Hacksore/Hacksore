import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <pre style={{ textAlign: "left" }}>{JSON.stringify(session, null, 2)}</pre>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}

export default Login;
