import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authServices';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/loader';

const initialState = {
  email: '',
  password: ''
};

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are Required");
    }

    if (!validateEmail(email)) {
      return toast.error('Please Enter a valid Email');
    }

    const userData = { email, password };
    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.username));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 lg:px-8">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <Loader />
          </div>
        )}
        <div className="sm:w-full sm:max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              className="mx-auto h-16 w-auto"
              src="https://img.freepik.com/premium-vector/chicken-logo-icon-design_775854-566.jpg?w=740"
              alt="Your Company"
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">
              Log in to your account
            </h2>
            {/* <p className="mt-2 text-xs text-gray-500">Scroll Down</p> */}
          </div>

          <form className="space-y-6" onSubmit={login}>
            <div >
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot_password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={password}
    onChange={handleInputChange}
    placeholder="Password"
    className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.941 5 12 5c4.059 0 8.268 2.943 9.542 7-1.274 4.057-5.483 7-9.542 7-4.059 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.941 5 12 5c4.059 0 8.268 2.943 9.542 7-1.274 4.057-5.483 7-9.542 7-4.059 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </button>
</div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
