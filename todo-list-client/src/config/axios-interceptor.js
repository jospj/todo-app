import axios from 'axios';

const TIMEOUT = 1000000; // 10000
const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        config.timeout = TIMEOUT;
        return config;
    };
    const onResponseSuccess = response => response;
    const onResponseError = err => {
        const status = err.status || err.response.status;
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;