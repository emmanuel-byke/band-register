
export const LineInput = ({ type = 'text', label, name, value, onChange, placeholder = '', ...rest }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 
          appearance-none focus:outline-none focus:ring-0 focus:border-blue-500
          text-white transition-colors peer
          /* Fix for autofill background color */
          [&:-webkit-autofill]:!bg-transparent
          [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_transparent_inset]
          [&:-webkit-autofill]:[-webkit-text-fill-color:white]
          [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute left-3 -top-3.5 text-gray-300 text-sm transition-all
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500
          peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
}