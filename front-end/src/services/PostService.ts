import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:80/api/posts/';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/';

class PostService {
  removePost(id: number, email: string) {
    return axios.patch(API_URL + 'delete/id/' + id, {email:email}, {headers: authHeader()});
  }
  savePost(id: number, email: string) {
    return axios.patch(API_URL + 'id/' + id, {
      email: email
    }, {headers: authHeader()});
  }

  getAllPosts() {
    return axios.get(POSTS_URL + 'posts');
  }

  getAllUserPosts(email: string) {
    return axios.post(API_URL + 'all', {
      email: email
    }, {headers: authHeader()});
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', {
      headers: authHeader()
    });
  }
}

export default new PostService();