"use client";

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from '../lib/validationSchemas';
import Link from 'next/link';
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateField = useCallback((name, value) => {
    try {
      signInSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);

    // Validate all fields
    Object.keys(formData).forEach(key => validateField(key, formData[key]));

    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setServerError('Invalid email or password');
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setServerError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('google', { callbackUrl: '/profile' });
      if (result?.error) {
        console.error('Google Sign-In failed:', result.error);
        setServerError('Failed to sign in with Google. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error during Google Sign-In:', error);
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Sign In</h2>
        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <div className="mt-4">
          <Button onClick={handleGoogleSignIn} className="w-full bg-zinc-600 hover:bg-zinc-500 text-zinc-100">
            Sign In with Google
          </Button>
          <div className="mt-4">
            <span>Don't have an account? <Link className="text-blue-500" href="/signup">Sign Up</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}