import * as actionType from './actions'
import * as webUtil from '../utils/WebUtil'

function retrieveState(){
    let oauth = {accessToken:null, userRole:[]};
    const oauthStr=sessionStorage.getItem("oauth");   
    if(oauthStr){
        oauth = JSON.parse(oauthStr);
      } 
  return oauth;
}


const initialState = {
    oauth:retrieveState()
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.SAVE_JWT_TOKEN:
            state={...state}
            state.oauth=action.payload;
            webUtil.persisteState(action.payload);
            break;
        case actionType.REMOVE_JWT_TOKEN:
            state={...state}
            state.oauth={accessToken:null, userRole:[]};
            webUtil.persisteState(state.oauth);
            break;
        default:
          return state;   
    }

    return state;

}

export default reducer;