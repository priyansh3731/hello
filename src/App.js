import { useRef, useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { useReactToPrint } from 'react-to-print';

function App() {

  const [image , setimage ] = useState([])
  const [backimage , setbackimage ] = useState("")
  const printPDF = useRef();

  const changeHandler=(e)=>{
    const file = e.target.files[0];
    console.log(file)
    setimage([...image,file])
    console.log(image)
  }

  const changeHandler2=(e)=>{
    const file = e.target.files[0];
    console.log(file)
    setbackimage(file)
    console.log(image)
  }

  const genratePDF=useReactToPrint({
    content: ()=> printPDF.current,
    documentTitle:"demo",
    onAfterPrint:()=>window.location.reload()
})

  return (
    <div className="App">
      <div className='name'>
      <h4>logo</h4>
      <input onChange={changeHandler} type='file' />
      
      <h4>background image</h4>
      <input onChange={changeHandler2} type='file' />

      <h4>insert</h4>
      <input onChange={changeHandler} type='file' />

      <button onClick={genratePDF}>print</button>

      </div>
      <div ref={printPDF} style={{backgroundImage : backimage===""? 'none': `url(${URL.createObjectURL(backimage)})`}} className='page'>
      {
        image.map((image)=>{
          return(
            <Draggable className='imagediv'>
              <img src={URL.createObjectURL(image)} />
            </Draggable>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
