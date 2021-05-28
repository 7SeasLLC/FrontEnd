export const getCurrentUser = () => {
  return JSON.parse(window.localStorage.getItem('user'));
}
