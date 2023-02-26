const Button = ({ name }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full px-4 py-4 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-500"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
