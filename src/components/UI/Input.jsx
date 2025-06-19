import React from "react";

const FormInput = ({ label, type = "text", name, register, rules, error, placeholder,  }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
