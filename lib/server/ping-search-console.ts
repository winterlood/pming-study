import axios from "axios";

export const pingSearchConsole = (url) => {
  axios
    .get(`https://www.google.com/ping?sitemap=${url}/sitemap.xml`)
    .then((res) => console.log(`ping success : ${res.statusText}`))
    .catch((err) => console.log(`ping failed : ${err.response.statusText}`));
};
