# react-prebuilt-form-manager

`react-prebuilt-form-manager` is a lightweight form management library for React applications. It provides a simple and flexible way to manage form state, validation, submission, and error handling.

## Features

- **Form State Management:** Easily manage form data and track changes.
- **Validation Support:** Define validation rules for form fields.
- **Submission Handling:** Handle form submission with ease.
- **Error Reporting:** Automatically track and display form errors.
- **Customizable:** Configure validation schema and submission behavior according to your requirements.

## Installation

You can install `react-prebuilt-form-manager` via npm or yarn:

```bash
npm install react-prebuilt-form-manager
```

or

```bash
yarn add react-prebuilt-form-manager
```

## Usage

```javascript
import React from 'react'
import useForm from 'react-prebuilt-form-manager'

const MyForm = () => {
// Define initial form state and validation schema
  const initialState = {
    username: '', email: '', password: '',
  }

  const validationSchema = {
    username: (value) => (value ? null : 'Username is required'),
    email: (value) => value ? (/\S+@\S+\.\S+/.test(value) ? null : 'Invalid email address') : 'Email is required',
    password: (value) => (value ? (value.length >= 8 ? null : 'Password must be at least 8 characters') : 'Password is required'),
  }

// Initialize form hook
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  } = useForm(initialState, validationSchema)

// Handle form submission
  const onSubmit = async (formData) => {
// Perform form submission logic here
    console.log('Form data submitted:', formData)
  }

  return (<form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      {formErrors.username && <div>{formErrors.username}</div>}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      {formErrors.email && <div>{formErrors.email}</div>}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      {formErrors.password && <div>{formErrors.password}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>)
}

export default MyForm
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
