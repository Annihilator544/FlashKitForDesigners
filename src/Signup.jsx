import React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth, db } from './firebase';
import logo from './assets/logo.svg'
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./components/ui/form"
import { Input } from "./components/ui/input"
import { Button } from './components/ui/button';
import { SelectSeparator } from './components/ui/select';
import SignUp from './assets/SignUp.svg';
import { useAuthStore } from 'store/use-auth-data';
import GoogleButton from './assets/GoogleButton.svg';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const formSchema = z.object({
    username: z.string().min(3,{message:"Username should be minimum 3 letters"}).max(100),
    email: z.string().email(),
    password: z.string().min(8,{message:"Password should be minimum 8 letters"}).max(100),
    confirmPassword: z.string().min(8,{message:"Password should be minimum 8 letters"}).max(100),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  });

const Signup = () => {
    const navigate = useNavigate();
    const { signIn, setUser } = useAuthStore();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        },
    })

    async function onSubmit(values) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            // await setDoc(doc(db, 'users', user.uid), {
            //     email: user.email,
            //     createdAt: new Date(),
            //     // Add any other user data you want to save
            // });
            await updateProfile(user, {
                displayName: values.username,
            });
            setUser(user);
            if(localStorage.getItem("valid")){
                navigate("/dashboard")
            }
            else{
                navigate("/secret")
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if(errorMessage.includes("auth/email-already-in-use")) { 
                alert("Email already exists")
                // relocate to login page
                navigate("/login")
            }
            console.log(errorCode, errorMessage);
        }
    }

    async function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // const userDoc = await getDoc(doc(db, 'users', user.uid));
            // if (!userDoc.exists()) {
            //     // If new user, save their data to Firestore
            //     await setDoc(doc(db, 'users', user.uid), {
            //         email: user.email,
            //         displayName: user.displayName,
            //         photoURL: user.photoURL,
            //         createdAt: new Date(),
            //     });
            // }
            setUser(user);
            // await signIn(user.email, null, true);
            if(localStorage.getItem("valid")){
                navigate("/dashboard")
            }
            else{
                navigate("/secret")
            } // Redirect to dashboard or appropriate page after successful sign-in
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    }

  return (
    <div className='grid grid-cols-2 h-screen'>
        <div className=' bg-gradient-to-r from-[#A0D0EA] to-[#6CC2F1]  flex-1 flex flex-col  rounded-r-[50px] SignUp'>
                
        </div>
        <div className='flex flex-col flex-1 overflow-y-auto'>
            <div className='flex flex-col justify-center align-middle w-[50%] m-auto'>
                <img src={logo} alt='logo' className='h-12 mr-auto mb-10'/>
                <p className='text-2xl font-medium nter'>Get Started !</p>
                <p className='text-base font-normal text-secondary mb-10'>Create a new account!</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="choose a username" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="confirm password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">Sign up</Button>
                    </form>
                </Form>
                <div className='my-5 flex gap-2'>
                    <SelectSeparator className="flex-1 my-auto" /> or <SelectSeparator className="flex-1 my-auto" />
                </div>
                <button class="gsi-material-button" onClick={handleGoogleSignIn}>
                    <div class="gsi-material-button-state"></div>
                    <div class="gsi-material-button-content-wrapper">
                        <div class="gsi-material-button-icon">
                            <img src={GoogleButton} alt="GoogleButton" className='m-[2px]' />
                        </div>
                        <span class="gsi-material-button-contents">Sign up with Google</span>
                        <span style={{display: "none"}}>Sign up with Google</span>
                    </div>
                </button>
                <div className='mt-4'>
                    <p>Already have an account? <NavLink to="/login" className='text-primary'>Sign in</NavLink></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup