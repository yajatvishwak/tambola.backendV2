import axios from "axios";

export default function makeaCall(type, url, data) {
  if (type === "POST") {
    // console.log(url);
    // console.log(data);
    var response = axios
      .post(url, data)
      .then((response) => {
        //console.log(response);
        return response.data;
      })
      .catch((err) => {
        return null;
      });
    //console.log(response);
    return response;
  }
}
