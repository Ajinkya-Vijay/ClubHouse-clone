import { Router, Request, Response } from "express";
import {client} from '../stream-client'
import { UserObjectRequest } from "@stream-io/node-sdk";

const router = Router();

router.post("/createUser", async (req: Request, res: Response) => {

    const {userName, name, image} = req.body;

    if(!userName || !name || !image){
        return res.status(400).json({message : "Required fields are empty"})
    }

    const newUser : UserObjectRequest = {
        id : userName,
        role : 'user',
        name,
        image,
    }
    const user = await client.upsertUsers({
        users:{
            [newUser.id] : newUser
        },
    });

    const expiry = Math.floor(Date.now()/1000 + 24* 60 *60)
    const token = client.createToken(userName,  expiry)

    return res.status(200).json({token, userName, name})
})


export default router;