import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../components/layout/Layout";
import { AuthContext } from "../contexts/AuthContext";
import { IAuthContext } from "../types/Context";

export default function Home() {
  const { auth } = useContext<IAuthContext>(AuthContext);
  return (
    <Layout>
      <Helmet>
        <title>Dating App</title>
      </Helmet>

      <div className="mx-auto">
        Hello, {auth.user?.firstName} {auth.user?.lastName}
      </div>
    </Layout>
  );
}
