import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/use-auth-data";

function Secret (){
const navigate = useNavigate();  
const {  setUser } = useAuthStore(); 
const formSchema = z.object({
    password: z.string().min(8,{message:"Password should be minimum 8 letters"}).max(100),
  })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        password: "",
        },
    })

    function onSubmit(values) {
        if(values.password === "flashkit@12345"){
            localStorage.setItem("valid",true);
            navigate("/dashboard")
        }
        else{
            form.setError("password", { type: "manual", message: "Invalid password" });
            setUser(null)
            navigate("/login")
        }

    }
    return (
        <div className="w-1/3 mx-auto h-screen  flex flex-col justify-center">
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Secret Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">Let Me In !</Button>
                    </form>
                </Form>
            </div>
    )
}

export default Secret;