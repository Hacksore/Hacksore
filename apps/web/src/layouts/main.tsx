import { Header } from "../components/header";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
