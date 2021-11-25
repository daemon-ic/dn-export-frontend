import Router from "./Router";
import SessionContextProvider from "./context/SessionContext";
import LoggedInProvider from "./context/LoggedInContext";

function App() {
  return (
    <div>
      <LoggedInProvider>
        <SessionContextProvider>
          <Router />
        </SessionContextProvider>
      </LoggedInProvider>
    </div>
  );
}
export default App;
