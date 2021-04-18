import { useState } from "react";
import ProcessIndicator from "./ProcessIndicator";
import CloudUpload from "@heroicons/react/solid/CloudUploadIcon";
import CheckCircle from "@heroicons/react/solid/CheckCircleIcon";

const Upload = props => {

    const [highlighted, setIsHighlighted] = useState(false);
    const [currentlyUploading, setIsUploading] = useState(false);
    const [redirectURL, setRedirectURL] = useState("");

    const handleDragEnter = e => {
        setIsHighlighted(true)
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        setIsHighlighted(false)
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        setIsHighlighted(true)
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = e => {
        setIsHighlighted(false)
        e.preventDefault();
        e.stopPropagation();

        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    };

    const handleFiles = files => {
        // TODO: Restrict uploading to one file with error message

        setIsUploading(true)
        uploadFile(files[0])
    }

    function uploadFile(file) {
        let url = "http://127.0.0.1:8000/uploadfile/"
        let formData = new FormData()
      
        formData.append("file", file)
      
        fetch(url, {
          method: "POST",
          body: formData
        })
        .then(processResponse)
        .catch(() => { /* Error. Inform the user */ })
    }

    function processResponse(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
            console.log(data.message)
            setRedirectURL(data.message)
            setIsUploading(false)
        });
      }

    

    return (
        <div className="w-2/5 bg-white-100 pt-15">
            <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-md">
                <h1 className="font-bold text-gray-500 text-xl text-center">UPLOAD AUDIO</h1>
                <p className="text-gray-400 text-sm mb-6 text-center">Summarize your Clubhouse-Discussion / Podcast!</p>

                    <div id="drop-area" className={`${highlighted ? "bg-indigo-100" : "bg-indigo-50"} rounded-5 mb-10 p-5 border-dashed border-2 border-indigo-200 rounded-md text-center`} onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}>
                        {currentlyUploading ? <ProcessIndicator/> : 
                        <>
                        {redirectURL.length > 1 ? 
                        <div>
                            <div className="flex justify-center">
                                <CheckCircle className="w-20 h-20 mb-3 text-indigo-600"/> 
                            </div>
                            <div>
                                <p className="text-indigo-700 font-medium mb-7">Upload successful!</p>
                                <p className="text-gray-500">Click <a className="text-indigo-700" href={`http://localhost:3000/room/${redirectURL}`}>[here]</a> to get your summary!</p>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="flex justify-center">
                            <CloudUpload className="w-15 h-14 mb-4 text-gray-500"/>
                        </div>

                        <form>
                            <input className="hidden" type="file" id="fileElem" accept="audio/mpeg"/>

                            <p className="text-center font-light text-sm text-gray-500 mb-1">drop your audio here</p>
                            <p className="text-center font-light text-sm text-gray-500 mb-3">OR</p>
                            <label className="inline-block bg-indigo-600 hover:bg-indigo-500 focus:outline-none text-white text-sm py-2 px-4 rounded" htmlFor="fileElem">Browse</label>
                        </form>
                        </div>
                        }
                        </>}
                    </div>
                        
                </div>

        </div>
    )
}

export default Upload