import { ReactChild } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
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
