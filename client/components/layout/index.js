import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main className="d-flex flex-column flex-grow-1 container justify-content-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
