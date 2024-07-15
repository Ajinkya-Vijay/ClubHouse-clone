import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { peoples_images } from "../../images";
import Cookies from 'universal-cookie'
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useUser } from "../user-context";
import { useNavigate } from "react-router-dom";

interface FormValues {
    userName : string;
    name : string;
}

export const SigninPage = () =>{

    const cookies = new Cookies();
    const {setClient, setUser} = useUser();

    const navigate = useNavigate()

    const schema = yup.object().shape({
        userName : yup.string().required("userName is required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid userName"),
        name :  yup.string().required("Name is required"),
    })

    const {register, handleSubmit, formState : {errors},} =useForm<FormValues>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<FormValues>= async(data, event)=>{
        event?.preventDefault()
        const {userName, name} = data

        const response = await fetch("http://localhost:3001/auth/createUser",{
            method: "POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify({
                userName,
                name,
                image: peoples_images[Math.floor(Math.random() * peoples_images.length)]
            })
        })

        if(!response.ok){
            alert("some error occured while signin ");
            return;
        }
        const responseData = await response.json()
        console.log(responseData)

        const user : User ={
            id: userName,
            name,
        }

        const myClient = new StreamVideoClient({
            apiKey : "u3zmx3c2dt2q",
            user,
            token : responseData.token

        })

        setClient(myClient);
        setUser({userName, name});
        const expires = new Date ()
        expires.setDate(expires.getDate() +1)
        cookies.set("token",responseData.token,{
            expires
        })

        cookies.set("userName",responseData.userName,{
            expires
        })

        cookies.set("name",responseData.name,{
            expires
        });

        navigate('/')
    }
    return(
        <div className="sign-in">
            <h1>
                Welcome to YOURS Audio Chats
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>userName:</label>
                    <input type="text" {...register("userName")}/>
                    {errors.userName && <p style={{color:"red"}}>{errors.userName.message}</p>}
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