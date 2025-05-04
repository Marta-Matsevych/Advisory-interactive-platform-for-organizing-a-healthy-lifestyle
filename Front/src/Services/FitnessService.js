import axios from 'axios';

const API_URL = '/api/fitness';

const getActivities = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const completeActivity = async (activityId) => {
    const response = await axios.put(`${API_URL}/${activityId}/complete`);
    return response.data;
};

export const FitnessService = {
    getActivities,
    completeActivity,
};
