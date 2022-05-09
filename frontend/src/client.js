import config from './config';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

const axios = require('axios');


class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };
    this.authToken = config.authToken;

    this.login = this.login.bind(this);
    this.apiClient = this.getApiClient(this.config);
  }

  /* ----- Authentication & User Operations ----- */

  /* Authenticate the user with the backend services.
	 * The same JWT should be valid for both the api and cms */
  login(username, password) {
    delete this.apiClient.defaults.headers['Authorization'];

    // HACK: This is a hack for scenario where there is no login form
    const form_data = new FormData();
    const grant_type = 'password';
    const item = {grant_type, username, password};
    for (const key in item) {
      form_data.append(key, item[key]);
    }


    return this.apiClient
        .post('/users/token', form_data)
        .then((resp) => {
          console.log(resp);
          localStorage.setItem('token', JSON.stringify(resp.data));
          return this.fetchUser();
        })
        .catch(error => console.log(error))
  ;}

  fetchUser() {
    return this.apiClient
    .get('/users/me')
    .then(({data}) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    })
    .catch(error => console.log(error))
  ;}

  register(email, password, fullName) {
    const loginData = {
      email,
      password,
      is_active: true,
    };

    return this.apiClient
    .post('/users', loginData)
    .then((resp) => {
          console.log(resp.data);
          return resp.data;
        })
    .catch(error => console.log(error))
  ;
  }

  // Logging out is just deleting the jwt.
  logout() {
    // Add here any other data that needs to be deleted from local storage
    // on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /* ----- Client Configuration ----- */

  /* Create Axios client instance pointing at the REST api backend */
  getApiClient(config) {
    const initialConfig = {
      baseURL: `${config.apiBasePath}/api`,
    };
    const client = axios.create(initialConfig);
    client.interceptors.request.use(localStorageTokenInterceptor);
    return client;
  }

  getTrainer(Id) {
    return this.apiClient.get(`/trainers/profile/${Id}`);
  }

  getTrainers(keyword) {
    return this.apiClient.get(`/trainers/profile/search/?keyword=${keyword}&max_results=10`).then(({data}) => {
      return data;
    });
  }

  getUsers() {
    return this.apiClient.get(`/users/all-users`);
    
  }

  createRecipe(label, url, source, submitter_id) {
    const recipeData = {
      label,
      url,
      source,
      submitter_id: submitter_id,
    };
    return this.apiClient.post(`/recipes/`, recipeData);
  }


  deleteRecipe(recipeId) {
    return this.apiClient.delete(`/recipes/${recipeId}`);
  }
}


// every request is intercepted and has auth header injected.
function localStorageTokenInterceptor(config) {
  const headers = {};
  const tokenString = localStorage.getItem('token');


  if (tokenString) {
    const token = JSON.parse(tokenString);
    const decodedAccessToken = jwtDecode(token.access_token);
    const isAccessTokenValid = true;
			//moment.unix(decodedAccessToken.exp).toDate() > new Date();
    if (isAccessTokenValid) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
    } else {
      alert('Your login session has expired');
    }
  }
  config['headers'] = headers;
  return config;
}

export default FastAPIClient;