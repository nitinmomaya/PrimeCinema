import { useState } from "react";

const SwitchTabs = ({ items, onChange }) => {
  const [left, setLeft] = useState();
  const [select, setSelect] = useState(0);

  const active = (item, index) => {
    setLeft(index * 96);
    setSelect(index);
    onChange(item, index);
    console.log("item", item);
  };

  return (
    <>
      <div className=" bg-black/10 flex px-2 py-2  rounded-full ">
        <div className=" flex  items relative  rounded-full">
          {items.map((item, index) => (
            <button
              key={index}
              className={`item font-semibold  hover:text-slate-500 w-24 h-12 flex items-center cursor-pointer justify-center  rounded-full relative z-10   ${
                select === index ? " text-slate-50  " : "text-slate-50"
              }`}
              onClick={() => active(item, index)}
            >
              {item}
            </button>
          ))}
          <div
            style={{ left }}
            className=" w-24 h-12  bg-black  rounded-full  absolute left-0 "
          ></div>
        </div>
      </div>
    </>
  );
};

export default SwitchTabs;
