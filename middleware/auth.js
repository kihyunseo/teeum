export default function ({ store, redirect, app, route }) {
  const token = app.$cookiz.get('user');
  const loginPageCheck = route.path;
  if (loginPageCheck === '/oauth/login' || loginPageCheck === '/oauth/kakao') {
    return;
  }
  if (!token) {
    return redirect('/oauth/login');
  }
  if (!store.state.user.me) {
    return redirect('/oauth/login');
  }
  return store.dispatch('user/loadUser');
}
