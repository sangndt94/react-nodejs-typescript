import Cookie from "js-cookie";

export const userCookie = "userCookie"; // name
export const userCookieAgreed = "TRUE"; // value
export const cookieExpirationInDays = 16 / 24; // 16 hours

export const setCookie = (name = userCookie, value = userCookieAgreed, expires = cookieExpirationInDays) => {
    return Cookie.set(name, value, { expires: expires })
}

export const getCookie = (name = userCookie) => {
    const cookieValue = Cookie.get(name)
    return cookieValue
}

