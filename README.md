# GenForm - Dynamic Form Generator

GenForm is a powerful and flexible dynamic form generator that allows you to create complex forms using JSON schema definitions. Built with React and styled with Tailwind CSS, it provides a beautiful and intuitive interface for generating and managing forms.

## Features

- 🔄 Dynamic form generation from JSON schema
- 📱 Responsive design with modern UI
- 🎨 Beautiful gradient interface
- 📑 Support for nested form sections
- 💾 Real-time form data preview
- ✨ Multiple input types support
- 🔍 Form validation
- 📝 Built-in schema examples

## Demo Features

- Load pre-built simple or complex schema examples
- Collapsible JSON editor
- Real-time form data visualization
- Smooth loading animations
- Error handling for invalid JSON

## Supported Field Types

- Text input
- Email input
- Password input
- Select dropdown
- Textarea
- Nested sections

## Schema Structure

```json
[
  {
    "type": "section",
    "name": "sectionName",
    "label": "Section Label",
    "fields": [
      {
        "type": "text",
        "name": "fieldName",
        "label": "Field Label",
        "required": true,
        "placeholder": "Enter value..."
      }
    ]
  }
]
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/genform.git
```

2. Install dependencies:
```bash
cd genform
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. Enter your JSON schema in the editor, or use the "Load Simple Schema" / "Load Complex Schema" buttons
2. Click "Generate Form" to create your dynamic form
3. The form will be generated based on your schema
4. Form data is automatically tracked and displayed below the form

## Technologies Used

- React
- Tailwind CSS
- JSON Schema
- Modern JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Inspired by the need for flexible form generation
