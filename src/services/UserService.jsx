import axios from "axios"

const SignUp = async (data) =>{
    const res = await axios.post("api/users/sign-up", data)
    return res
}

const SignIn = async (data) =>{
    const res = await axios.post("api/users/sign-in", data)
    return res.data
}

const MyAccount = async (token) =>{
    const res = await axios.get("api/users/my-account", {headers: {'Authorization': `bearer ${token.token}`}});
    return res.data
}

export default {
    SignUp,
    SignIn,
    MyAccount
}