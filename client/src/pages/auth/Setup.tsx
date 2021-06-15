import { Helmet } from "react-helmet-async";
import SetupProfile from "../../components/user/Setup";

function Setup() {
  return (
    <>
      <Helmet>
        <title>Set up profile</title>
      </Helmet>

      <SetupProfile />
    </>
  );
}

export default Setup;
