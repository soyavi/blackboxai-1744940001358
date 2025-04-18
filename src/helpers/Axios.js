// Here we are importing axios and AsyncStorage modules
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Here we are requiring the Settings module from the '../config' directory
const Settings = require('../config/Settings');

// This function creates and returns an instance of the axios client with default options and an interceptor
const fetchClient = () => {
  // Set the default options for the axios instance
  const defaultOptions = {
    baseURL: Settings.API_URL,
    headers: {
      'content-type': 'application/json',
      'x-requested-with': 'XMLHttpRequest',
      crossdomain: true,
    },
  };

  // Create a new axios instance with the default options
  let instance = axios.create(defaultOptions);

  // Add an interceptor to modify the request before it is sent
  instance.interceptors.request.use(
    async config => {
      // Get the access token from AsyncStorage
      const token = await AsyncStorage.getItem('access_token');
      // Add the Authorization header to the request if a token is present
      config.headers.Authorization = token ? `Bearer ${token}` : '';

      // Log the request URL if in development mode
      __DEV__ && console.log('fetching', instance.getUri(config));

      // Return the modified request config
      return config;
    },
    function (error) {
      // Log any request errors
      console.log(error);
      // Reject the request with the error
      return Promise.reject(error);
    },
  );

  // Return the axios instance with the interceptor
  return instance;
};

// Export the fetchClient function
export default fetchClient();
