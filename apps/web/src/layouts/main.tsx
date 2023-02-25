import { Header } from "../components/header"

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main>        
        {children}
      </main>
    </>
  )
}

export default MainLayout