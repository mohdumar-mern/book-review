import Footer from "./Footer";
import Header from "./Header";


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] p-4 container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
