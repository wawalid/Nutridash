import axios from './axios';

export const analyzeMealRequest = (mealData) => {
  return axios.post("/analyze", mealData, {
    headers: { "Content-Type": "application/json" }
  });
};
