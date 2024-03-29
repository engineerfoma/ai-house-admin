import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
// CUSTOM COMPONENT
import { MatxLoading } from 'app/components'

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
}

const BASE_URL = 'https://aihouse.asai-dev.ru/api/v1'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload
      return { ...state, isAuthenticated, isInitialized: true, user }
    }

    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        auth_token: action.payload.auth_token,
      }
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null }
    }

    case 'REGISTER': {
      const { user } = action.payload

      return { ...state, isAuthenticated: true, user }
    }

    default:
      return state
  }
}

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {},
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/auth/token/login/`, {
      email,
      password,
    })
    const { auth_token } = response.data

    localStorage.setItem('auth_token', auth_token)
    dispatch({ type: 'LOGIN', payload: auth_token })
  }

  const register = async (email, phone, first_name, password) => {
    const response = await axios.post(`${BASE_URL}/auth/users/`, {
      email,
      phone,
      first_name,
      password,
    })

    const { user } = response.data

    dispatch({ type: 'REGISTER', payload: { user } })
  }

  const logout = () => {
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
          },
        })
        dispatch({
          type: 'INIT',
          payload: { isAuthenticated: true, user: data },
        })
      } catch (err) {
        console.error(err)
        dispatch({
          type: 'INIT',
          payload: { isAuthenticated: false, user: null },
        })
      }
    })()
  }, [])

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />

  return (
    <AuthContext.Provider
      value={{ ...state, method: 'JWT', login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
