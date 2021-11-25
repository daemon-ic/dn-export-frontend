import { InputBase } from "@mui/material";
import { styles } from "../styles";

const InputForms = ({ emailInput, passwordInput, onLogin }) => {
  return (
    <>
      <InputBase
        style={styles.input}
        placeholder=" Dueling Nexus Email"
        {...emailInput}
      />
      <InputBase
        style={styles.input}
        type="password"
        placeholder="Password"
        {...passwordInput}
      />
      <div style={styles.loginButton} onClick={onLogin}>
        Sign In
      </div>
    </>
  );
};
export default InputForms;
