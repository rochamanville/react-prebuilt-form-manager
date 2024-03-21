// Import dependencies
import React, { useState } from 'react';

// Define the useForm hook
export const useForm = (initialState = {}, validationSchema = {}) => {
  // State to hold form data
  const [formData, setFormData] = useState(initialState);
  // State to hold form errors
  const [formErrors, setFormErrors] = useState({});
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to validate form fields
  const validateForm = () => {
    let errors = {};
    // Iterate over each field in the validation schema
    for (const field in validationSchema) {
      // Call the validation function for the field
      const validationFn = validationSchema[field];
      const fieldValue = formData[field];
      const fieldError = validationFn(fieldValue);
      // If there's an error, add it to the errors object
      if (fieldError) {
        errors[field] = fieldError;
      }
    }
    // Set the form errors state
    setFormErrors(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form before submission
    const isValid = validateForm();
    // If form is valid, submit data
    if (isValid) {
      setIsSubmitting(true);
      try {
        // Call onSubmit prop with form data
        await onSubmit(formData);
      } catch (error) {
        // Handle submission error
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Return form state and utility functions
  return {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

// Export useForm hook as default
export default useForm;
