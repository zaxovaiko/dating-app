import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../contexts/AuthContext";
import { IAuthContext } from "../types/context";

export default function Home() {
  const { auth } = useContext<IAuthContext>(AuthContext);
  return (
    <>
      <Helmet>
        <title>Dating App</title>
      </Helmet>

      <div className="mx-auto">
        Hello, {auth.user?.firstName} {auth.user?.lastName}
      </div>
    </>
  );
}
