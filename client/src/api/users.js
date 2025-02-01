import axiosInstance from "./index";

export const RegisterUser = async (value) => {
    console.log(value);
    try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}