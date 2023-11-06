import { axiosInstance } from ".";

export const Analytic = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/analytics/test-anlytics",
      payload
    );
    console.log("response.data -->", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
