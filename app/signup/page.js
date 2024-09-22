// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../firebase/clientApp';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from 'next/link'; 
// import { signUpSchema } from '../lib/validationSchemas';

// import { Loader2 } from "lucide-react";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     region: '',
//     chessId: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear the error for this field when the user starts typing
//     setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setServerError('');
//     setIsLoading(true); // Set loading to true when form is submitted

//     try {
//       // Client-side validation
//       await signUpSchema.parseAsync(formData);

//       // If validation passes, proceed with sign-up
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       await updateProfile(userCredential.user, {
//         displayName: formData.fullName,
//       });
      
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         userId: userCredential.user.uid,  // Add this line
//         email: formData.email,   
//         fullName: formData.fullName,
//         region: formData.region,
//         chessId: formData.chessId,
//         role: "user",
//         team: {
//           name: "Chess Masters",
//           rank: "Beginner",
//           joinDate: new Date().toISOString(),
//         }
//       });

//       router.push('/signin');
//     } catch (error) {
//       if (error.errors) {
//         // Zod validation errors
//         const validationErrors = {};
//         error.errors.forEach(err => {
//           validationErrors[err.path[0]] = err.message;
//         });
//         setErrors(validationErrors);
//       } else {
//         // Server-side or Firebase errors
//         console.error("Error signing up:", error);
//         setServerError(error.message);
//       }
//     } finally {
//       setIsLoading(false); // Set loading to false when form is submitted
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4">
//   <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-md p-8">
//     <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Sign Up</h2>
//     {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
//     <form onSubmit={handleSignUp} className="space-y-4">
//       <Input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
//       />
//       {errors.email && <p className="text-red-500">{errors.email}</p>}
//       <Input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//         className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
//       />
//       {errors.password && <p className="text-red-500">{errors.password}</p>}
//       <Input
//         type="text"
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleChange}
//         placeholder="Full Name"
//         className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
//       />
//       {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
//       <div className="relative">
//         <select
//           name="region"
//           value={formData.region}
//           onChange={handleChange}
//           className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500 appearance-none rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-zinc-500"
//         >
//           <option value="" disabled className="text-zinc-400">Select Region</option>
//           <option value="north">North</option>
//           <option value="south">South</option>
//           <option value="east">East</option>
//           <option value="west">West</option>
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
//           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//             <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//           </svg>
//         </div>
//       </div>
//       {errors.region && <p className="text-red-500">{errors.region}</p>}
//       <Input
//         type="text"
//         name="chessId"
//         value={formData.chessId}
//         onChange={handleChange}
//         placeholder="Chess ID"
//         className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
//       />
//       {errors.chessId && <p className="text-red-500">{errors.chessId}</p>}

//       <Button 
//         type="submit" 
//         className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Loading...
//           </>
//         ) : (
//           'Sign Up'
//         )}
//       </Button>
//     </form>
//     <div className="mt-4">
// <span>Already have an account? <Link className="text-blue-500" href="/signin">Sign In</Link></span>
// </div>
//   </div>
// </div>
//   );
// }

"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase/clientApp';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'; 
import { signUpSchema } from '../lib/validationSchemas';
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    region: '',
    chessId: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateField = useCallback((name, value) => {
    try {
      signUpSchema.pick({ [name]: true }).parse({ [name]: value });
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

  const handleSignUp = async (e) => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        userId: userCredential.user.uid,
        email: formData.email,   
        fullName: formData.fullName,
        region: formData.region,
        chessId: formData.chessId,
        role: "user",
        team: {
          name: "Chess Masters",
          rank: "Beginner",
          joinDate: new Date().toISOString(),
        }
      });

      router.push('/signin');
    } catch (error) {
      console.error("Error signing up:", error);
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Sign Up</h2>
        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
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
          <div>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <div className="relative">
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500 appearance-none rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              >
                <option value="" disabled className="text-zinc-400">Select Region</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
          </div>
          <div>
            <Input
              type="text"
              name="chessId"
              value={formData.chessId}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Chess ID"
              className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
            />
            {errors.chessId && <p className="text-red-500 text-sm mt-1">{errors.chessId}</p>}
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
              'Sign Up'
            )}
          </Button>
        </form>
        <div className="mt-4">
          <span>Already have an account? <Link className="text-blue-500" href="/signin">Sign In</Link></span>
        </div>
      </div>
    </div>
  );
}