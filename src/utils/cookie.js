
const convertObjectToJson = (object) => {
    return JSON.stringify(object);
}

const convertJsonToObject = (json) => {
    return JSON.parse(json);
}

export const createJsonCookie = (name, json, hours) => {
    var jsonString = convertObjectToJson(json);
    createCookie(name, jsonString, hours);
}

export const getJsonCookie = (name) => {
    var cookieValue = getCookie(name);
    if (cookieValue) {
        return convertJsonToObject(cookieValue);
    }
    return null;
}

export const createCookie = (name, value, hours) => {
    var expires = "";
    console.log(name, value, hours)
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie= name + "=" + value + expires;
}

export const getCookie = (name) => {
    var cookieString = document.cookie;
    var cookies = cookieString.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieParts = cookie.split("=");

        if (cookieParts[0] === name) {
            return cookieParts[1];
        }
    }

    return null;
}