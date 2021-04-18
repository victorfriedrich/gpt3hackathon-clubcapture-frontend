import SpeakerField from "./SpeakerField";

const TranscriptElement = ({speakerName, speakerID, text}) => {
    return (
      <div className="mb-5">
        <SpeakerField speakerName={speakerName} speakerID={speakerID}/>
        <span className="text-gray-800">{text}</span>
      </div>
    )
  }
  
  export default TranscriptElement