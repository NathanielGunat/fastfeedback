import { useAuthContext } from '../lib/auth'

export default function Home() {
  const authContext = useAuthContext()

  function handleSignIn() {
    authContext?.signInWithGooglePopUp()
  }

  function handlelogOut() {
    authContext?.logOut()
  }
  return (
    <>
      <div>
        <code>
          <pre>{authContext?.user?.email}</pre>
        </code>
      </div>
      <button onClick={handleSignIn}>hi</button>
      <button onClick={handlelogOut}>logout</button>
    </>
  )
}
