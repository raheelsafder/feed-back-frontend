import axios  from "axios";
const ApiService = {
    install:()=>{
        axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
        axios.defaults.headers.common["Content-Type"] = "application/json";
    },
    GetRequest(url , params){
      return axios({
          method:"GET",
          url: url,
          params: params
      });
    },
    PostRequest(url , data){
        return axios({
            method:"POST",
            url: url,
            data: data
        });
    },
    PutRequest(url , requestBody , params){
        return axios({
            method:"PUT",
            url: url,
            data: requestBody,
            params:params
        });
    },
    DeleteRequest(url , data , params){
        return axios({
            method:"DELETE",
            url: url,
            data: data,
            params:params
        });
    },
    PostImageRequest(url , data){
        return axios({
            method:"POST",
            url: url,
            data: data,
            headers: {"Content-Type": "multipart/form-data"}
        });
    }
}
export default ApiService;