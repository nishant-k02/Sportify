import axios from "axios";
import config from '../config/config';
axios.defaults.withCredentials = true;

const checkSession = async () => {
  const token = localStorage.getItem("token");
  try {
    console.log("Logging");
    const response = await axios.post(
      `${config.API_URL}/session`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
    return true; // Session is valid
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return false; // Session is not valid
    }
    console.log(error);
    return false; // Session is not valid
  }
};
export default checkSession;
