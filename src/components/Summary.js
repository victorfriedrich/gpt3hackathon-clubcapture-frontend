import { Disclosure } from "@headlessui/react";
import ChevronUpIcon from "@heroicons/react/solid/ChevronUpIcon";
import { useState } from "react"
import { useEffect } from "react";

const Summary = ({roomID}) => {
    useEffect(() => {
        
        fetch("http://localhost:8000/room/" + roomID)
            .then(response => response.json())
            .then(data => setTranscriptElements(data));

    }, []);

    // Splits the text into segments when a different speaker is talking
    const processInput = (text) => {
        const replaced = text.replaceAll("Speaker", "*Speaker");
        return replaced.split("*")
    }

    // Skeleton for testing purposes. TODO: Remove
    const [transcriptElements, setTranscriptElements] = useState(
        {"summary":{"summaries":[{"input":"Speaker 2: This is a very standard conventional view","summary":"\nThe"},{"input":"Speaker 1: So","summary":"\nThe"},{"input":"Speaker 2: so forth.","summary":"\nThe Economic"}]},"transcript":{"items":[{"speakerID":2,"text":"This"},{"speakerID":1,"text":"So"},{"speakerID":2,"text":"so forth."}]}}
    )

    return (
        <div className="border-teal p-8 border-t-12 mb-6 rounded-lg bg-white shadow-md">            
            <div className="mb-12">

                {transcriptElements.summary.summaries.map((summary, id) => (
                    <Disclosure key={id}>
                        {({ open }) => (
                        <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 mb-4">
                        <span className="w-11/12">{summary.summary}</span>
                        <ChevronUpIcon
                        className={`${
                            open ? "transform rotate-180" : ""
                        } w-5 h-5 text-indigo-500`}
                        />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-5 text-sm text-gray-500">
                        {processInput(summary.input).map((e) => (
                        <p className="px-2 py-1 mb-2 rounded text-xs text-gray-700 mr-2 bg-gray-100">{e}</p> 
                        ))}
                    </Disclosure.Panel>
                    </>
                )}
                    </Disclosure>
                ))}
            </div>
        </div>
      );

  
}

export default Summary