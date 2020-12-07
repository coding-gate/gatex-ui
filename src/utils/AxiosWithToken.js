import axios from 'axios';
import * as WebUtil from '../utils/WebUtil'
import store from '../store/store'
import * as actionType from '../store/actions'

const axiosWithToken = axios.create({
    baseURL: WebUtil.URL
});

axiosWithToken.interceptors.request.use(request=>{
    const state = store.getState();
    const accessToken = state.oauth.accessToken;
    if(accessToken){
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(request);
    return request;
})

axiosWithToken.interceptors.response.use(response=>{
    console.log(response);
    return response;
 }, error=>{
    console.log(error.response)
    if(error.response){
        if(error.response.status===401){
           store.dispatch({ type: actionType.REMOVE_JWT_TOKEN})
        }
    }
    
    return Promise.reject(error);

  })

export default axiosWithToken;

