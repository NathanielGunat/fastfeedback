import { createContext, ReactNode, useContext, useState } from 'react'
import { firebaseApp } from './firebase.config'
import {
  User,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'

// types
interface iAuthContext {
  user: User | null
  signInWithGooglePopUp: () => Promise<any>
  logOut: () => void
}

//firebase

const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

//UseContext hook
export function useAuthContext() {
  return useContext(AuthContext)
}

//auth provider
const AuthContext = createContext<iAuthContext | null>(null)

// reducer

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  async function signInWithGooglePopUp() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential!.accessToken

      return { token }
    } catch (error) {
      const errorMessage = (error as Error).message
      console.log(errorMessage)
      return { errorMessage: errorMessage }
    }
  }

  async function logOut() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, logOut, signInWithGooglePopUp }}>
      {children}
    </AuthContext.Provider>
  )
}
