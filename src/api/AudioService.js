import axios from "axios";

export default class AudioService {
 static async getAudio() {
  return axios.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=ukraine&api_key=a493339eab41042535b8ed742cd475ff&format=json");
}
}