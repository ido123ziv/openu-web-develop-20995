import { Request, Response } from "express";
import DBHandler from "./recommendationsDBHandler";
export default class Handler {
    private dbHandler = new DBHandler();

    constructor() {
        this.dbHandler = new DBHandler();
      }

    getDBHandler() {
        return this.dbHandler;
    }

    getPreview = async (req: Request, res: Response) => {
        try {
            const data = await this.dbHandler.getRecommendationPreview();
            if (!data){
                return res.status(404).json({ message : "no recommendation found"})
            }
            res.status(200).json(data);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "We got a problem with recommendations chief!"})
        }
    }
    getBabysitter = async (req: Request, res: Response) => {
        const babysitter_id = +req.params.babysitter
        try {
            const data = await this.dbHandler.getBabySitterRecommendation(babysitter_id);
            if (!data){
                return res.status(404).json({ message : `no recommendation found for ${babysitter_id}`})
            }
            res.status(200).json(data);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "We got a problem with recommendations chief!"})
        }
    }
    getParent = async (req: Request, res: Response) => {
        const parent_id = +req.params.parent
        try {
            const data = await this.dbHandler.getParentRecommendation(parent_id);
            if (!data){
                return res.status(404).json({ message : `no recommendation found for ${parent_id}`})
            }
            res.status(200).json(data);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "We got a problem with recommendations chief!"})
        }
    }
    getBabySitterParent = async (req: Request, res: Response) => {
        const parent_id = +req.params.parent
        const babysitter_id = +req.params.babysitter
        try {
            const data = await this.dbHandler.getParentBabysitterRecommendation(parent_id, babysitter_id);
            if (!data){
                return res.status(404).json({ message : `no recommendation found for ${parent_id} and ${babysitter_id}`})
            }
            res.status(200).json(data);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "We got a problem with recommendations chief!"})
        }
    }
}