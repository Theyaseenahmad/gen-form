import React from 'react';

const DynamicForm = ({ schema, onChange, parentKey = '' }) => {
  const renderField = (field, fieldPath) => {
    const fieldId = fieldPath ? `${fieldPath}.${field.name}` : field.name;

    // Handle nested sections recursively
    if (field.type === 'section') {
      return (
        <div 
          key={fieldId}
          className="mb-6 p-4 border border-gray-600 rounded-lg bg-gray-800/50"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">
            {field.label}
          </h3>
          <div className="space-y-4">
            {field.fields.map((nestedField) => 
              renderField(nestedField, fieldId)
            )}
          </div>
        </div>
      );
    }

    // Handle regular form fields
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <div className="mb-6" key={fieldId}>
            <label 
              htmlFor={fieldId}
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              id={fieldId}
              name={fieldId}
              onChange={onChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
            />
          </div>
        );
        
      case 'select':
        return (
          <div className="mb-6" key={fieldId}>
            <label 
              htmlFor={fieldId}
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <select
              id={fieldId}
              name={fieldId}
              onChange={onChange}
              required={field.required}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">Select an option</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div className="mb-6" key={fieldId}>
            <label 
              htmlFor={fieldId}
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <textarea
              id={fieldId}
              name={fieldId}
              onChange={onChange}
              required={field.required}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {schema.map(field => renderField(field, parentKey))}
    </div>
  );
};

export default DynamicForm;