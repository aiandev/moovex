import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:80/api/users/';

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify({token:response.data.token, email: email}));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(email: string, password: string) {
    return axios.post(API_URL + 'register', {
      email,
      password
    });
  }
  
  checkToken(){
    return axios.post(API_URL + '/validate', {headers: authHeader()});
  }
}

export default new AuthService();
