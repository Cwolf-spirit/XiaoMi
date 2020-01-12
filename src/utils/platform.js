import axios from "axios";
// 退出功能
function signOut() {
  axios.post("/user/logout", {}).then(data => {
    // eslint-disable-next-line no-console
    console.log("退出", data);
  });
}

export default {
  signOut
};
