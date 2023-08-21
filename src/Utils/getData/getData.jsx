import axios from "axios";

const getData = async (url)=> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getData;