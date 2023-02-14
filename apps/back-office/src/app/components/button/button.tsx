import {FC,PropsWithChildren} from 'react';
import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  label?:string
}

export const Button:FC<PropsWithChildren<ButtonProps>> = ({label,children})=> {
  return (
    <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
      { label && <span>{label}</span> }
      { children }
    </button>
  );
}

export default Button;
