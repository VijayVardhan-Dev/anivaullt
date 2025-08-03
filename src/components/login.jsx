import { FiSend } from "react-icons/fi";

const NeumorphismButton = () => {
  return (
    <button
      className={`
        px-4 py-2 rounded-full 
        flex items-center gap-2 
        text-black font-bold  bg-[#e0e0e0]

        shadow-[1px_1px_10px_#C71585,-1px_-1px_10px_#8806CE]
        transition-all duration-300 ease-in-out

        hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]
        hover:text-violet-600
      `}
    >
      <FiSend />
      <span>Login</span>
    </button>
  );
};

export default NeumorphismButton;
