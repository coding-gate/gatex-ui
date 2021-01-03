
function getUrl() {
    let url = window.location.protocol + '//' + window.location.hostname + ":" + window.location.port
    return url;
}

export const parseJwt = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
};

export const persistOauthState = function (oauth) {
    sessionStorage.setItem("oauth", JSON.stringify(oauth));
}

export const persistAdminAcountState = function (adminAcountState) {
    sessionStorage.setItem("AdminAcountState", adminAcountState);
}

export const handleError = function (error, props) {

    if (error.response) {
        let errMsg = 'Error occurred!';
        if (error.response.status === 401) {
            props.history.push("/login");
        } else if (error.response.status === 400) {
            errMsg = 'Invalid Credentials !';
        } else if (error.response.status === 406) {
            errMsg = error.response.data.map(e => <li>{e}</li>);
        } else if (error.response.status === 403            
            || error.response.status === 404
            || error.response.status === 409
        ) {
            errMsg = error.response.data
        }

        if (props.setAlert) {
            props.setAlert({ type: 'warning', message: errMsg });
        }

    } else {
        props.history.push("/error");
    }
    console.log(error)
}


export const URL = getUrl();