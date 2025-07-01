export const validateAuthForm = (isLogin, formData) => {
  const errors = cleanAuthForm();

  if (isLogin) {
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.password.trim()) errors.password = 'Password is required';
  } else {
    if (!formData.fname.trim()) errors.fname = 'First name is required';
    if (!formData.lname.trim()) errors.lname = 'Last name is required';
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (/\s/.test(formData.username)) {
      errors.username = 'Username cannot contain spaces';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      errors.phone_number = 'Invalid phone number (10 digits required)';
    }
  }
  return errors;
};

export const cleanAuthForm = () => ({
  username: '',
  fname: '',
  lname: '',
  password: '',
  phone_number: ''
});