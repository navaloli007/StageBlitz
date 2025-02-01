import { axiosInstance } from "./index";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const updateMovie = async (payload) => {
    try {
        const response = await axiosInstance.put(
            "api/movies/update-movie",
            payload
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const deleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.put(
            "api/movies/delete-movie",
            payload
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
};