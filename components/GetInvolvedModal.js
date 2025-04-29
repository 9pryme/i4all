import { useState } from 'react';
import FormInput from './FormInput';

export default function GetInvolvedModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // You would replace this with your actual form submission logic
      // For example, calling an API endpoint
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSubmitStatus({
        success: true,
        message: 'Thank you for your interest! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        interest: '',
        message: ''
      });
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Interest options
  const interestOptions = [
    { value: '', label: 'Select your interest' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'funding', label: 'Funding Initiatives' },
    { value: 'volunteer', label: 'Volunteer Work' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        {/* Modal Panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold leading-6 text-gray-900 font-cormorant">
                    Get Involved
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  Fill out the form below to connect with us. We're excited to hear from you!
                </p>
                
                {submitStatus ? (
                  <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {submitStatus.message}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                      type="text"
                      name="name"
                      id="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required={true}
                      placeholder="Your full name"
                    />
                    
                    <FormInput
                      type="email"
                      name="email"
                      id="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      placeholder="your.email@example.com"
                    />
                    
                    <FormInput
                      type="select"
                      name="interest"
                      id="interest"
                      label="Area of Interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required={true}
                    >
                      {interestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormInput>
                    
                    <FormInput
                      type="textarea"
                      name="message"
                      id="message"
                      label="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required={true}
                      placeholder="Tell us how you'd like to get involved..."
                      rows={4}
                    />
                    
                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors text-center w-full"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}