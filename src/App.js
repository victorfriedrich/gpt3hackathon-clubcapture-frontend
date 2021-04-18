import {useEffect} from "react";
import Upload from "./components/Upload";
import Transcript from "./components/Transcript"


function App() {

useEffect(() => {
  document.body.classList.add("h-screen" ,"bg-indigo-400")
})

  return (
    <div className="container mx-auto h-full flex justify-center items-center pt-20">
        <Upload />
    </div>
  );
}

export default App;
