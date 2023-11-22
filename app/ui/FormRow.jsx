const FormRow = ({ children, label, error }) => {
  return (
    <div className=" grid grid-cols-[5rem_2fr_1.5fr] justify-items-center gap-x-8 items-center">
      <label
        htmlFor={children.props.id}
        className="label capitalize justify-self-start text-zinc-500 font-semibold "
      >
        {label}:
      </label>
      {children}
      {error && <span className=" text-red-500">{error}</span>}
    </div>
  );
};

export default FormRow;
