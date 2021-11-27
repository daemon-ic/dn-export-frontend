import { useEffect, useState } from "react";
import { axiosGetDeck, axiosListDecks } from "../../api/DuelingNexusApi";
import { useSessionContext } from "../../context/SessionContext";
import { useLoggedInContext } from "../../context/LoggedInContext";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useHistory } from "react-router-dom";
import FileSaver from "file-saver";

function download(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, filename);
}

const MainPage = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useLoggedInContext();
  const { authHeaders, setAuthHeaders, saveSessionId } = useSessionContext();
  const [deckList, setDeckList] = useState(null);

  async function getUserDecks(headers) {
    const response = await axiosListDecks({ headerData: headers });
    setDeckList(response);
  }

  useEffect(() => {
    if (!loggedIn) history.push("/");
    if (authHeaders) getUserDecks(authHeaders);
  }, []);

  async function downloadDeck(id, headers) {
    console.log("DOWNLOADING DECK...");
    const deck = await axiosGetDeck({ id: id, headerData: headers });
    download(`${deck.name}.txt`, deck.txt);
    download(`${deck.name}.ydk`, deck.ydk);
  }

  function onLogout() {
    history.push("/");
    setLoggedIn(false);
    setAuthHeaders(null);
    saveSessionId();
  }

  if (!deckList && !authHeaders) return <div>Loading...</div>;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#11131B",
          height: "55px",
          position: "fixed",
          color: "white",
          fontWeight: "1000",
          fontSize: "30px",
        }}
      >
        <div style={{ marginLeft: "30px", marginBottom: "5px" }}>dne</div>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "800",
            fontSize: "18px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "55px",
            backgroundColor: "#7e1bb9",
          }}
          onClick={onLogout}
        >
          <MeetingRoomIcon style={{ marginRight: "10px" }} />
          Logout
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "55px",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            color: "white",
            marginTop: "60px",
            marginBottom: "60px",
            fontWeight: "800",
            fontSize: "25px",
            width: "50%",
            textAlign: "center",
            border: "1px solid #3a3f50",
            minWidth: "300px",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "25px",
            paddingBottom: "25px",
            borderRadius: "5px",
          }}
        >
          Select a deck below to download the .ydk file
        </div>
        {deckList &&
          deckList.map((deck) => (
            <div
              key={deck.id}
              className={"download-button"}
              onClick={() => downloadDeck(deck.id, authHeaders)}
            >
              <div>{deck.name.toUpperCase()}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
