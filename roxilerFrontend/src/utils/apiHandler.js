import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function apiGET(url, data,config) {
    let apiUrl = baseUrl + url;
    return await axios
        .get(apiUrl, {...data}, { ...config })
        .then((response) =>
        {console.log(response)
        return response
        })       
         .catch((error) => error.response);
}
export async function apiPOST(url, config = {}) {
    let apiUrl = baseUrl + url;
    return await axios
        .post(apiUrl, { ...config })
        .then((response) =>
        {console.log(response)
        return response
        })
        .catch((error) => error.response);
}