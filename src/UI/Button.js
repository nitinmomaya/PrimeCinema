const Button = ({ name }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full px-4 py-4 rounded-md bg-black text-white font-semibold hover:bg-black/90"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
