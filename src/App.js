import { useEffect, useState } from 'react';
import './App.css';
import DropDown from './DropDown';



function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false)


  useEffect(() => {
    fetch("http://127.0.0.1:8888/api/fruits")
      .then((response) => response.json())
      .then((d) => {
        console.log(d)
        setData(d.data.fruits)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [])

  const onChangeValue = (v) => {
    setValue(v)
  }

  return (
    <div className="App">
      <DropDown value={value} error={error} onChange={onChangeValue} items={data} />
    </div>
  );
}

export default App;
