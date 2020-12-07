
function getUrl() {
    let url = window.location.protocol + '//' + window.location.hostname + ":" + window.location.port
    return url+"/itman";
}

export const parseJwt = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
};

export const persisteState = function (oauth) {
    sessionStorage.setItem("oauth", JSON.stringify(oauth));
}

export const handleError = function (error, props) {

    if (error.response) {
        if (error.response.status === 400) {
            if (props.setAlert) {
                props.setAlert({ type: 'warning', message: 'Invalid credentials !' });
            }
        } else if (error.response.status === 401) {
            props.history.push("/login");
        } else {
            props.history.push("/error");
        }

    } else {
        props.history.push("/error");
    }
    console.log(error)
}


export const URL = getUrl();