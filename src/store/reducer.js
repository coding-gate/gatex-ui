import * as actionType from './actions'
import * as webUtil from '../utils/WebUtil'

function retrieveOauthState(){
    let oauth = {accessToken:null, userRole:[]};
    const oauthStr=sessionStorage.getItem("oauth");   
    if(oauthStr){
        oauth = JSON.parse(oauthStr);
      } 
  return oauth;
}

function retrieveAdminAcountState() {
    if (sessionStorage.getItem("AdminAcountState")) {
        return sessionStorage.getItem("AdminAcountState");
    } else {
        return "NA";
    }
}


const initialState = {
    oauth: retrieveOauthState(),
    isAdminAccountConfigured: retrieveAdminAcountState(),
    mcqSerchParam: { lang: null, time: null, complexity: null, tags: null, type: null }
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.SAVE_JWT_TOKEN:
            state={...state}
            state.oauth=action.payload;
            webUtil.persistOauthState(action.payload);
            break;
        case actionType.REMOVE_JWT_TOKEN:
            state={...state}
            state.oauth={accessToken:null, userRole:[]};
            webUtil.persistOauthState(state.oauth);
            break;
         case actionType.SAVE_SITE_INIT_STATE:
            state={...state}
            state.isAdminAccountConfigured=action.payload;
            webUtil.persistAdminAcountState(action.payload);
            break; 
        case actionType.SAVE_MCQ_SEARCH_PARAM:
            state={...state}
            state.mcqSerchParam=action.payload;
            break;    
        default:
          return state;   
    }

    return state;

}

export default reducer;