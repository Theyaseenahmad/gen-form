import React, { useState } from 'react';
import DynamicForm from './components/DynamicForm';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [schema, setSchema] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSchemaCollapsed, setIsSchemaCollapsed] = useState(false);

  const complexSchemaExample = [
    {
      "type": "section",
      "name": "personalInfo",
      "label": "Personal Information",
      "fields": [
        {
          "type": "text",
          "name": "firstName",
          "label": "First Name",
          "required": true,
          "placeholder": "Enter your first name"
        },
        {
          "type": "text",
          "name": "lastName",
          "label": "Last Name",
          "required": true,
          "placeholder": "Enter your last name"
        },
        {
          "type": "section",
          "name": "identification",
          "label": "Identification Details",
          "fields": [
            {
              "type": "text",
              "name": "passportNumber",
              "label": "Passport Number",
              "placeholder": "Enter passport number"
            },
            {
              "type": "select",
              "name": "idType",
              "label": "ID Type",
              "required": true,
              "options": [
                { "value": "passport", "label": "Passport" },
                { "value": "drivingLicense", "label": "Driving License" },
                { "value": "nationalId", "label": "National ID" }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "name": "contactInfo",
      "label": "Contact Information",
      "fields": [
        {
          "type": "email",
          "name": "email",
          "label": "Email",
          "required": true,
          "placeholder": "Enter your email"
        },
        {
          "type": "text",
          "name": "phone",
          "label": "Phone Number",
          "required": true,
          "placeholder": "+1 (xxx) xxx-xxxx"
        },
        {
          "type": "section",
          "name": "address",
          "label": "Address Details",
          "fields": [
            {
              "type": "text",
              "name": "street",
              "label": "Street Address",
              "required": true,
              "placeholder": "Enter street address"
            },
            {
              "type": "text",
              "name": "apartment",
              "label": "Apartment/Suite",
              "placeholder": "Apt, Suite, Unit (optional)"
            },
            {
              "type": "section",
              "name": "location",
              "label": "Location",
              "fields": [
                {
                  "type": "text",
                  "name": "city",
                  "label": "City",
                  "required": true,
                  "placeholder": "Enter city"
                },
                {
                  "type": "text",
                  "name": "state",
                  "label": "State/Province",
                  "required": true,
                  "placeholder": "Enter state"
                },
                {
                  "type": "text",
                  "name": "zipCode",
                  "label": "ZIP/Postal Code",
                  "required": true,
                  "placeholder": "Enter ZIP code"
                },
                {
                  "type": "select",
                  "name": "country",
                  "label": "Country",
                  "required": true,
                  "options": [
                    { "value": "us", "label": "United States" },
                    { "value": "uk", "label": "United Kingdom" },
                    { "value": "ca", "label": "Canada" },
                    { "value": "au", "label": "Australia" },
                    { "value": "de", "label": "Germany" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "name": "professionalInfo",
      "label": "Professional Information",
      "fields": [
        {
          "type": "select",
          "name": "employmentStatus",
          "label": "Employment Status",
          "required": true,
          "options": [
            { "value": "employed", "label": "Employed" },
            { "value": "selfEmployed", "label": "Self-Employed" },
            { "value": "unemployed", "label": "Unemployed" },
            { "value": "student", "label": "Student" }
          ]
        },
        {
          "type": "section",
          "name": "currentEmployment",
          "label": "Current Employment",
          "fields": [
            {
              "type": "text",
              "name": "companyName",
              "label": "Company Name",
              "placeholder": "Enter company name"
            },
            {
              "type": "text",
              "name": "jobTitle",
              "label": "Job Title",
              "placeholder": "Enter job title"
            },
            {
              "type": "textarea",
              "name": "jobDescription",
              "label": "Job Description",
              "placeholder": "Describe your role and responsibilities",
              "rows": 4
            }
          ]
        }
      ]
    }
  ];

  const simpleSchemaExample = [
    {
      "type": "email",
      "name": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "Enter your email"
    },
    {
      "type": "password",
      "name": "password",
      "label": "Password",
      "required": true,
      "placeholder": "Enter your password"
    }
  ];

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setError('');
  };

  const handleJsonSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const parsedSchema = JSON.parse(jsonInput);
      if (!Array.isArray(parsedSchema)) {
        throw new Error('Schema must be an array of field objects');
      }
      setSchema(parsedSchema);
      setError('');
      setIsSchemaCollapsed(true);
    } catch (err) {
      console.log(err);
      
      setError('Invalid JSON format. Please check your input.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const parts = name.split('.');
      let newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      
      return newData;
    });
  };

  const loadComplexSchema = () => {
    setJsonInput(JSON.stringify(complexSchemaExample, null, 2));
    setError('');
  };

  const loadSimpleSchema = () => {
    setJsonInput(JSON.stringify(simpleSchemaExample, null, 2));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#97ebf3] via-[#2a2ea7] to-[#271bab] py-12 px-4 sm:px-6 lg:px-8">

      <h1 className='text-center txt uppercase font-extrabold '>GenForm</h1>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* JSON Input Section */}
        <div className="bg-gradient-to-br from-[#00292d] to-[#01212e] p-6 rounded-xl drop-shadow-[10px_10px_20px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl text-base font-bold text-white">
              Enter Form Schema
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={loadSimpleSchema}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Load Simple Schema
              </button>
              <button
                type="button"
                onClick={loadComplexSchema}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Load Complex Schema
              </button>
              <button 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsSchemaCollapsed(!isSchemaCollapsed)}
              >
                {isSchemaCollapsed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <form onSubmit={handleJsonSubmit} className={`space-y-4 transition-all duration-300 ${isSchemaCollapsed ? 'hidden' : 'block'}`}>
            <div>
              <textarea
                className="w-full h-96 p-4 font-mono text-sm bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={jsonInput}
                onChange={handleJsonChange}
                placeholder={`Enter JSON schema here... Note: json schema must be enclosed in [] brackets \n Eg: [
  {
    "type": "email",
    "name": "email",
    "label": "Email Address",
    "required": true,
    "placeholder": "Enter your email"
  },
  {
    "type": "password",
    "name": "password",
    "label": "Password",
    "required": true,
    "placeholder": "Enter your password"
  }
]`}
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Form...
                </>
              ) : (
                'Generate Form'
              )}
            </button>
          </form>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-white">Generating Your Form...</p>
            </div>
          </div>
        )}

        {/* Dynamic Form Section */}
        {schema && !isLoading && (
          <div className="bg-gradient-to-br from-[#00292d] to-[#01212e] p-6 rounded-xl drop-shadow-[10px_10px_20px_rgba(0,0,0,1)] animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-white">Generated Form</h2>
            <form onSubmit={handleFormSubmit}>
              <DynamicForm schema={schema} onChange={handleFormChange} />
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
            
            {/* Display current form data */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-white">Current Form Data:</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto max-h-60">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;