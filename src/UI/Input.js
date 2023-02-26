import { useState } from "react";

const Input = ({
  label,
  type,
  value,
  touched,
  name,
  onChange,
  onBlur,
  errors,
  placeholder,
  icon,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <label
          className="font-medium font-display text-grey-500"
          htmlFor={label}
        >
          {label}
        </label>
        <input
          className="w-full bg-white px-4 py-2 my-2 rounded-md active:bg-neutral-50 border-[1px] border-neutral-200 font-display focus:border-blue-600 focus:bg-white focus:border-2 focus:outline-none "
          type={show ? "text" : type}
          name={name}
          id={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />

        <div className="mb-4">
          {icon && (
            <button
              className="text-slate-900 font-display font-semibold"
              onClick={(e) => {
                e.preventDefault();

                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </button>
          )}
          {touched && errors ? (
            <p className=" text-red-700 font-display font-semibold">{errors}</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Input;
