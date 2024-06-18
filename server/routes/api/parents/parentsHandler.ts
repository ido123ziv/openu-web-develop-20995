import * as s3 from "../../../utils/aws/s3";

import DBHandler from "./parentsDBHandler";
import { Babysitter, Interaction, Validation } from "./parentsTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  userValidation = async (
    parentId: number,
    babysitterId: number
  ): Promise<Validation> => {
    const parent = await this.dbHandler.getParent(parentId);
    if (!parent) {
      return { isValid: false, message: "Parent user doesn't exist" };
    }

    const babysitter = await this.dbHandler.getBabysitter(babysitterId);
    if (!babysitter) {
      return { isValid: false, message: "Babysitter user doesn't exist" };
    }

    return { isValid: true };
  };

  interactionValidation = async (
    parentId: number,
    babysitterId: number
  ): Promise<Validation> => {
    const users = await this.dbHandler.validUsers(parentId, babysitterId);
    if (!users) {
      return { isValid: false, message: "Interaction doesn't exist" };
    }

    return { isValid: true };
  };

  getAllBabysitters = async (): Promise<Babysitter[]> => {
    // Fetch all babysitters from the database
    const allBabysitters = await this.dbHandler.getAllBabysitters();

    // Define a helper function to fetch and replace image string
    const fetchImageUrl = async (babysitter: Babysitter) => {
      const { imageString } = babysitter;
      if (imageString && imageString.length > 0) {
        try {
          const imageUrl = await s3.getImageUrl(imageString);
          if (!imageUrl) throw new Error("Error fetching image from s3");
          babysitter.imageString = imageUrl;
        } catch (error) {
          console.error(
            `Error fetching image for babysitter ${babysitter.name}: ${
              (error as Error).message
            }`
          );
        }
      }
    };

    // Use Promise.all to fetch image URLs in parallel
    await Promise.all(allBabysitters.map(fetchImageUrl));

    return allBabysitters;
  };

  getInteraction = async (
    parentId: number,
    babysitterId: number
  ): Promise<Interaction> => {
    return this.dbHandler.getInteraction(parentId, babysitterId);
  };

  handleInteraction = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    const interaction = await this.getInteraction(parentId, babysitterId);
    if (interaction) {
      await this.dbHandler.updateLastVisited(parentId, babysitterId);
    } else {
      await this.dbHandler.createInteraction(parentId, babysitterId);
    }
  };

  updateContacted = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    await this.dbHandler.updateContacted(parentId, babysitterId);
  };

  updateWorkedWith = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    await this.dbHandler.updateWorkedWith(parentId, babysitterId);
  };
}
