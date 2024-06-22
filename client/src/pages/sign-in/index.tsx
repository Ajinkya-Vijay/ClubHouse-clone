import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
    username : string;
    name : string;
}

export const SigninPage = () =>{
    const schema = yup.object().shape({
        username : yup.string().required("Username is required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid Username"),
        name :  yup.string().required("Name is required"),
    })

    const {register, handleSubmit, formState : {errors},} =useForm<FormValues>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<FormValues>=(data, event)=>{
        event?.preventDefault()
        const {username, name} = data

        console.log(username,name)
    }
    return(
        <div className="sign-in">
            <h1>
                Welcome to YOURS Audio Chats
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" {...register("username")}/>
                    {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text"  {...register("name")}/>
                    {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}