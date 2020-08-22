import Cookies from "js-cookie";

export const userCookie = "userCookie"; // name
export const userCookieAgreed = "TRUE"; // value
export const cookieExpirationInDays = 16 / 24; // 16 hours

export const setCookie = (value = userCookieAgreed,name = userCookie, expires = cookieExpirationInDays) => {
    return Cookies.set(name, value, { expires: expires })
}

export const getCookie = (name = userCookie) => {
    const cookieValue = Cookies.get(name)
    return cookieValue
}

export const removeCookie = (name = userCookie) => {
    const cookieValue = Cookies.remove(name)
    return cookieValue
}

