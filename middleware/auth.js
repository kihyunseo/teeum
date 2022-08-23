export default function ({ store, redirect, app, route }) {
  const token = app.$cookiz.get('user');
  const loginPageCheck = route.path;

  if (
    !token &&
    loginPageCheck !== '/login' &&
    loginPageCheck !== '/oauth/kakao'
  ) {
    return redirect('/login');
  }
}
