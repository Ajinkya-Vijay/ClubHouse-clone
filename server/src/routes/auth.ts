import { Router, Request, Response } from "express";

const router = Router();

router.post("/createUser", async (req: Request, res: Response) => {

    const {userName, name, image} = req.body;

    if(!userName || !name || !image){
        return res.status(400).json({message : "Required fields are empty"})
    }
})


export default router;