import axios from "axios"

const SignUp = async (data) =>{
    const res = await axios.post("api/users/sign-up", data)
    return res
}

const SignIn = async (data) =>{
    const res = await axios.post("api/users/sign-in", data)
    return res
}

export default {
    SignUp,
    SignIn
}