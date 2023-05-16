import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/e-clone-web-eddc0/us-central1/api",
});
// 새로운 리소스 create
export default instance;

// promise 비동기 통신 라이브러리
// 서버와의 통신을 유용하게 해주는 라이브러리
