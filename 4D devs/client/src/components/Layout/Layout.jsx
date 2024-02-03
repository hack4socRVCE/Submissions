import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, description, keyword, author, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Reconnect",
  description: "A chance to Reconnect with Normal Life",
  keyword: "IEEE, SIT",
  author: "Reconnect Team",
};

export default Layout;
