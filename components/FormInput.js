import React from 'react';

export default function FormInput({ 
  type = 'text', 
  name, 
  id, 
  label, 
  value, 
  onChange,
  required = false,
  placeholder = '',
  rows = 4,
  children
}) {
  // Modern styling for all form inputs
  const baseClasses = "block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-base transition duration-150 ease-in-out";
  
  // Input-specific classes
  const inputClasses = `${baseClasses} h-12 px-4`;
  const textareaClasses = `${baseClasses} p-4 min-h-[120px] resize-vertical`;
  const selectClasses = `${baseClasses} h-12 px-4 pr-8 appearance-none bg-no-repeat bg-right`;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          className={textareaClasses}
          placeholder={placeholder}
        ></textarea>
      ) : type === 'select' ? (
        <div className="relative">
          <select
            name={name}
            id={id}
            required={required}
            value={value}
            onChange={onChange}
            className={selectClasses}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}