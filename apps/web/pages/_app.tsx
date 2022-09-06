interface AppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
