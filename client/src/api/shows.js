import { axiosInstance } from ".";
export const addShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/shows/add-show", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const updateShow = async (payload) => {
    try {
        const response = await axiosInstance.put("/api/shows/update-show", payload);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const getShowsByTheatre = async (payload) => {
    try {
        const response = await axiosInstance.get(
            `/api/shows/get-all-shows-by-theatre/${payload.theatreId}`
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const deleteShow = async (payload) => {
    try {
        const response = await axiosInstance.delete(
            `/api/shows/delete-show/${payload.showId}`
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const getAllTheatresByMovie = async ({ movie, date }) => {
    try {
        const response = await axiosInstance.get(
            `/api/shows/get-all-theatres-by-movie/${movie}/${date}`
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const getShowById = async (payload) => {
    try {
        const response = await axiosInstance.get(
            `/api/shows/get-show-by-id/${payload.showId}`
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};