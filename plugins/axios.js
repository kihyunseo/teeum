export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const loginApi = $axios.create();
  const serverApi = $axios.create();

  // Set baseURL to something different
  loginApi.setBaseURL('http://localhost:4000');
  serverApi.setBaseURL('http://localhost:4001/v1');

  // Inject to context as $api
  inject('loginApi', loginApi);
  inject('serverApi', serverApi);
}
