export default {
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== ''
    } catch {
      return false
    }
  },
  userName: (state) => {
    try {
      return state.authUser.displayName
    } catch {
      return ''
    }
  },
  userEmail: (state) => {
    try {
      return state.authUser.email
    } catch {
      return ''
    }
  },
  userID: (state) => {
    try {
      return state.authUser.uid
    } catch {
      return ''
    }
  }
}
