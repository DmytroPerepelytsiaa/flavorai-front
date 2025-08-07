import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldErrors } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  loginSchema, 
  registerSchema, 
  type LoginFormData, 
  type RegisterFormData 
} from '../schemas';
import type { ErrorResponse } from '../types';
import api from '../api/api';

interface AuthPageProps {
  isLogin: boolean
};

function AuthPage({ isLogin }: AuthPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const schema = isLogin ? loginSchema : registerSchema;

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData | RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      const response = await api.post(`users/${isLogin ? 'login' : 'register'}`, data);
      const token = response.data;

      localStorage.setItem('token', token);
      navigate('/recipes');
    } catch (err: unknown) {
      setErrorMessage((err as ErrorResponse)?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-amber-50 px-5">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
              />
              {(errors as FieldErrors<RegisterFormData>).confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{(errors as FieldErrors<RegisterFormData>).confirmPassword?.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 cursor-pointer transition-colors duration-300"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center font-medium">{errorMessage}</p>
          )}

          <div className="text-sm text-center mt-2 font-medium">
            {isLogin ? (
              <>
                Don't have an account?
                <Link to="/register" className="text-amber-500 hover:underline block">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?
                <Link to="/login" className="text-amber-500 hover:underline block">
                  Log In
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
