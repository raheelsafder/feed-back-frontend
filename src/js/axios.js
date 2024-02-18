import axios from "axios";
import {useAuth} from '@/store/auth'

let userAuth;

axios.interceptors.request.use((request) => {
    userAuth = useAuth();
    request.headers.Authorization = userAuth.getAuth.token ? "Bearer " + userAuth.getAuth.token
        : "";
    return request;
})
