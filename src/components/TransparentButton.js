const TransparentButton = ({text, isActive, onClick}) => {
    return (
        <button type="button" className={`items-center px-4 py-2 border border-transparent font-medium text-sm rounded-md text-white focus:outline-none bg-black ${isActive ? "bg-opacity-20 hover:bg-opacity-20" : "bg-opacity-0 hover:bg-opacity-5"} mr-4`} onClick={onClick}>{text}</button>
    )
  }
  
  export default TransparentButton