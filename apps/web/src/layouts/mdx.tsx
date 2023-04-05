import { Header } from "../components/header";

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex flex-col justify-center w-full mx-auto max-w-5xl pb-10 px-5 sm:px-10 mb-4"
      >
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
