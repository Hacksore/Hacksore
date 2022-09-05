interface AppProps {
  Component: any;
  pageProps: any;
}

export async function getStaticPaths() {
  return {
    fallback: true,
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
