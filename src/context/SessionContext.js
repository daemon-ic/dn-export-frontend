import { createContext, useContext, useState, useEffect } from "react";
import { axiosGetSessionId } from "../api/DuelingNexusApi";

const SessionContext = createContext();

export const useSessionContext = () => {
  return useContext(SessionContext);
};

const SessionContextProvider = ({ children }) => {
  const [authHeaders, setAuthHeaders] = useState(null);

  async function saveSessionId() {
    try {
      const sessionId = await axiosGetSessionId();
      const headers = getHeaders(sessionId);
      setAuthHeaders(headers);
    } catch (e) {
      return console.log("ERROR getting session id", e);
    }
  }

  function getHeaders(session = false) {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    };
    if (session) {
      headers["Cookie"] = session;
    }
    return headers;
  }

  useEffect(() => {
    saveSessionId();
  }, []);

  return (
    <SessionContext.Provider
      value={
        authHeaders
          ? {
              authHeaders: authHeaders,
              setAuthHeaders: setAuthHeaders,
              saveSessionId: saveSessionId,
            }
          : {
              authHeaders: null,
              setAuthHeaders: setAuthHeaders,
              saveSessionId: saveSessionId,
            }
      }
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
