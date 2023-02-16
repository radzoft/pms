import { TextInput } from "flowbite-react";
import { ChangeEventHandler, FC, useRef, useState } from "react";

export interface OtpInputProps {
  digits:number,
  className?:string,
  onInput?:(code:string)=>void,
  onCompleted?:(code:string)=>void,
  disabled?:boolean
}

export const OtpInput:FC<OtpInputProps> = ({digits,className,disabled, onInput,onCompleted})=>{
  const [values,setValue] = useState(new Array(digits).fill('').map(d=>''))
  const [index,setIndex] = useState(0)
  const inputRefs = useRef<HTMLInputElement[]|null[]>([])

  const setValues = (value:string[])=>{
    setValue(value);
    if(onInput) onInput(value.join(''))
    if(value.length===digits) {
      setTimeout(() => inputRefs.current[index]?.blur()  , 47);
      if(onCompleted) onCompleted(value.join(''))
    }
  }

  const numbers = ['0','1','2','3','4','5','6','7','8','9']

  return (
    <div className={className}>
    <div className={`flex flex-row justify-evenly space-x-4 w-full `}>
      {
        values.map((v,i)=>(
          <input value={v} key={`v-${i}`} maxLength={1}
            disabled={disabled}
            className={`min- w-full rounded-md shadow-md text-4xl text-center pb-2 pt-3 font-mono outline-none
              focus:bg-gray-800 select-none focus:text-white selection:bg-transparent`}
            ref={el=>inputRefs.current[i]=el}
            draggable={false}
            required
            onPaste={e=>{
              e.preventDefault()
              if (disabled) return;
              const clipboard=e.clipboardData
                .getData('text/plain')
                .split('').filter(d=>numbers.includes(d));
              if(clipboard.length===0) return;
              setValues(values.map((vv,ii)=>clipboard[ii]??''))
              setTimeout(() => inputRefs.current[index]?.blur(), 47);
            }}
            onFocus={e=>{
              e.currentTarget.select();
              setIndex(i)
            }}
            onChange={e=>''}
            onKeyDown={e=>{
              if(['Tab','Enter'].includes(e.key)) return;
              if(['Backspace','Delete'].includes(e.key)){
                e.preventDefault();
                e.stopPropagation();
              }
              let next = i;
              if(['ArrowRight','ArrowUp'].includes(e.key)) next=i+1;
              else if (['ArrowLeft','ArrowDown'].includes(e.key)) next=i-1;
              else if(e.key==='Home') next=0;
              else if(e.key==='End') next=digits-1;
              else if('Backspace'===e.key) {
                next = i-1;
                setValues(values.map((v,ii)=>ii===i?'':v))
              } else if('Delete'===e.key) {
                next=i;
                setValues(values.map((v,ii)=>ii===i?'':v))
              } else if(numbers.includes(e.key)){
                setValues(values.map((v,ii)=>ii===i?e.key??'':v))
                next=i+1;
              } else {
                next=i;
              }

              if(next>=digits) return;
              if(next<0) next=0;

              inputRefs.current[next]?.focus()

              setTimeout(() => inputRefs.current[next]?.select()  , 47);

            }}
            />
        ))
      }
    </div>
    </div>
  )
}
