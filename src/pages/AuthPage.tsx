import { useForm, type FieldErrors } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

interface AuthPageProps {
  isLogin: boolean
}

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(36, 'Password must be at most 36 characters'),
})

const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, 'Confirm Password is required').max(36, 'Confirm Password must be at most 36 characters'),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

function AuthPage({ isLogin }: AuthPageProps) {
  const schema = isLogin ? loginSchema : registerSchema

  const { register,handleSubmit, formState: { errors } } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(isLogin ? 'Login data:' : 'Registration data:', data)
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full border px-3 py-2 rounded"
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
              className="w-full border px-3 py-2 rounded"
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
                className="w-full border px-3 py-2 rounded"
              />
              {(errors as FieldErrors<RegisterFormData>).confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{(errors as FieldErrors<RegisterFormData>).confirmPassword?.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>

          <div className="text-sm text-center mt-2">
            {isLogin ? (
              <>
                Don't have an account?
                <Link to="/register" className="text-blue-500 hover:underline block">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?
                <Link to="/login" className="text-blue-500 hover:underline block">
                  Log In
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
