import axios from "axios";
import { DOMAIN } from "../constants";

export async function axiosGetSessionId() {
  try {
    const response = await axios.get(DOMAIN + "/get-session-id");
    return response.data;
  } catch (e) {
    throw e;
  }
}
export async function axiosLogin(payload) {
  try {
    const response = await axios.post(DOMAIN + "/login", payload);
    if (response.data) return response.data;
    throw new Error(
      "Not successful login in: " + JSON.stringify(response.data)
    );
  } catch (e) {
    throw e;
  }
}

export async function axiosListDecks(headers) {
  try {
    const response = await axios.post(DOMAIN + "/get-decklist", headers);
    if (response.data.success) return response.data.decks;
    throw new Error("Error getting decks: " + JSON.stringify(response.data));
  } catch (e) {
    throw e;
  }
}

export async function axiosGetDeck(id) {
  try {
    const response = await axios.post(DOMAIN + "/get-deck", id);
    if (response.data) return response.data;
  } catch (e) {
    throw e;
  }
}
