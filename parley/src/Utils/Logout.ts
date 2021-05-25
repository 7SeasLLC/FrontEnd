const Logout = (window) => {
  window.localStorage.removeItem('user')
  window.location.replace("/")
}
export default Logout