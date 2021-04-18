import { useState } from "react"
import { useEffect } from "react";
import TranscriptElement from "./TranscriptElement"
import TransparentButton from "./TransparentButton"
import Summary from "./Summary"
import {ReactComponent as Time} from "./Time.svg"

const Transcript = ({roomID}) => {

    const speakerDict = {
        1: "Speaker 1",
        2: "Speaker 2",
        3: "Speaker 3",
        4: "Speaker 4",
        5: "Speaker 5",
        6: "Speaker 6"
    }

    useEffect(() => {

        fetch("http://localhost:8000/room/" + roomID)
            .then(response => response.json())
            .then(data => setTranscriptElements(data));
    
    }, []);

    const [inTranscriptMode, setInTranscriptMode] = useState("true")

    // Skeleton for testing purposes. TODO: Remove
    const [transcriptElements, setTranscriptElements] = useState(
        {"summary":{"summaries":[{"input":"Speaker 2: This is a very standard conventional view","summary":"\nThe"},{"input":"Speaker 1: So","summary":"\nThe"},{"input":"Speaker 2: so forth.","summary":"\nThe Economic"}]},"transcript":{"items":[{"speakerID":2,"text":"This"},{"speakerID":1,"text":"So"},{"speakerID":2,"text":"so forth."}]}}
    )


    return (
        <div className="w-3/5 bg-white-100 pt-15">
            {/* If the room data is not loaded yet, show waiting screen */}
            {transcriptElements == null || transcriptElements === undefined ? 
            <div  className="border-teal p-8 border-t-12 mb-6 rounded-lg bg-white shadow-md">
                <h1 className="text-2xl text-center font-bold text-indigo-800">Nothing's here yet</h1>
                <p className="text-base text-center font-medium text-gray-400 mb-14">Come back later</p>
                <div className="flex justify-center">
                    <Time style={{height:'200px', width: '400px'}}/>
                </div>
            </div>
            :
            <div>
                <div className="mb-4">
                    <TransparentButton text="Transcript" isActive={inTranscriptMode} onClick={() => setInTranscriptMode(true)}></TransparentButton>
                    <TransparentButton text="Summary" isActive={!inTranscriptMode} onClick={() => setInTranscriptMode(false)}></TransparentButton>
                </div>
                {!inTranscriptMode ? 
                <div>
                    <Summary roomID={roomID}/>
                </div>
                :    
                <div className="border-teal p-8 border-t-12 mb-6 rounded-lg bg-white shadow-md">
                    {transcriptElements.transcript.items.map((task, id) => (
                        <TranscriptElement speakerName={speakerDict[task.speakerID]} speakerID={task.speakerID} text={task.text} key={id}/> 
                    ))}
                </div>}
            </div>}
        </div>
    )
  }
  
  export default Transcript