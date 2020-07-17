import axios from "axios"

const SignUp = async (data) =>{
    const res = await axios.post("api/users/add", data)
    console.log(res);
    
    return res
}

export default {
    SignUp
}