import {useEffect} from "react";
import Upload from "./components/Upload";
import Transcript from "./components/Transcript"
import {
    useParams
  } from "react-router-dom";

const Room = () => {

    useEffect(() => {
        document.body.classList.add("h-screen" ,"bg-indigo-400")
    })
    
    let { roomID } = useParams();

    return (
        <div className="container mx-auto h-full flex justify-center items-center pt-20">
            <Transcript roomID={roomID}/>
        </div>
    );
}

export default Room;
