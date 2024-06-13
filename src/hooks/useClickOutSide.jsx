import {useEffect,useRef} from 'react'

export const useClickOutSide = (callback) => {
    const ref = useRef();

    useEffect(()=>{
        const handler = (event) => {
            if( ref.current && !ref.current.contains(event.target)) {
                callback();
             }
    };
    window.addEventListener("click", handler);

  return () =>{
     window.removeEventListener("click", handler);
  };
},[]);

      return ref;
};