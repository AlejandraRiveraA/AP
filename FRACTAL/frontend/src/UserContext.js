/*import React from 'react'

const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext*/

import React, { Component } from 'react'
import axios from 'axios'
const UserContext = React.createContext()

class UserProvider extends Component {
  

  // Context state
  state = {
    user: {}
  }


  async componentDidMount() {
    
    const res = await axios.get('http://localhost:5000/api/sessionState/')
    this.setState({user: { id: res.data[0].id, nombre: res.data[0].nombre, admin: res.data[0].admin }})
    console.log(this.state.user)
  }
  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }