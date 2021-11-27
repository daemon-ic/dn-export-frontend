import { useFormInput } from "../../hooks/common";
import { useSessionContext } from "../../context/SessionContext";
import { useHistory } from "react-router-dom";

import { axiosLogin } from "../../api/DuelingNexusApi";
import { styles } from "./styles";
import InputForms from "./components/InputForms";
import { formatLogin } from "./utils";
import { useLoggedInContext } from "../../context/LoggedInContext";

const LoginPage = () => {
  const history = useHistory();
  const { setLoggedIn } = useLoggedInContext();
  const { authHeaders } = useSessionContext();
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");

  async function onLogin() {
    const loginPostData = formatLogin(emailInput.value, passwordInput.value);
    try {
      const response = await axiosLogin({
        loginData: loginPostData,
        headerData: authHeaders,
      });
      if (response) {
        setLoggedIn(true);
        history.push("/main");
        return;
      }
      throw new Error("Not successful log in: " + JSON.stringify(response));
    } catch (e) {
      alert("ERROR logging in. Try again.");
      emailInput.clear();
      passwordInput.clear();
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!authHeaders ? (
        <div style={{ color: "white" }}>Connecting to server...</div>
      ) : (
        <div style={styles.inputContainer}>
          <InputForms
            emailInput={emailInput}
            passwordInput={passwordInput}
            onLogin={onLogin}
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
