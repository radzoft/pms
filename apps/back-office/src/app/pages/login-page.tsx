import Button from '../components/button/button';
import styles from './login-page.module.scss';

/* eslint-disable-next-line */
export interface LoginPageProps {
  onSignIn?:(user:unknown)=>void
}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-stone-200">
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Radzoft PMS Login</h1>
        <input placeholder='Username'></input>
        <input type="password" placeholder="Password"></input>
        <Button>Sign in with email</Button>

      </div>
    </div>
  );
}

export default LoginPage;
