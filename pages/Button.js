import { useState } from "react";

export default function Button(props) {
  const [counter, setCounter] = useState(1);

  function Increment() {
    setCounter(counter + 1);
  }

  return(
    <>
      {/* title é uma propriedade que criamos */}
      {/* children é oque está entro as tags */}
      <button onClick={Increment} >{props.title} {props.children} / Clicado {counter}</button>
      <br/> <br/>
    </>
  )
}
