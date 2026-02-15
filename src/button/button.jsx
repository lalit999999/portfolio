import React from "react";

const ButtonsSkill = ({
  text = "Button",
  onClick,
  bgColor = "bg-gray-200",
  outlineColor = "bg-black",
  textColor = "text-black",
}) => {
  return (
    <button
      className={`relative inline-block font-bold rounded-xl ${outlineColor} cursor-pointer`}
    >
      <span
        className={`
          block px-6 py-3 rounded-xl border-2 border-black
          transform -translate-y-1
          transition-transform duration-100 ease-in-out
          ${bgColor} ${textColor}
          hover:-translate-y-[6px]
          active:translate-y-0
        `}
      >
        {text}
      </span>
    </button>
  );
};

export default ButtonsSkill;
