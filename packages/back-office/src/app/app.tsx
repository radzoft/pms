import { useState } from "react";
import LoginPage from "./pages/login-page";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function App() {

  const [signedIn, setSignedIn] = useState(false)

  return signedIn ? (

    <div >asdf</div>

  ) : <LoginPage onSignIn={(user)=>setSignedIn(user!=null)}/>
}

export default App;
