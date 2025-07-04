// File : src/app/components/ui/InputField.js
const InputField = ({ label, id, name, type = 'text', value, onChange, required = true }) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          required={required}
        />
      </div>
    );
  };
  
  export default InputField;