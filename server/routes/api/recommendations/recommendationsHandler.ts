import DBHandler from "./recommendationsDBHandler";
import { Recommendation, Validation } from "./recommendationsTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  recommendationValidation = async (
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

    const recommendation = await this.dbHandler.existingRecommendation(
      parentId,
      babysitterId
    );

    if (recommendation) {
      return {
        isValid: false,
        message: "Parent already recommended babysitter",
      };
    }

    return { isValid: true };
  };

  getPreview = async (): Promise<Recommendation[]> => {
    return this.dbHandler.getRecommendationPreview();
  };

  getBabysitter = async (babysitterId: number): Promise<Recommendation[]> => {
    return this.dbHandler.getBabySitterRecommendation(babysitterId);
  };
  getBabysitterRating = async (babysitterId: number): Promise<number> => {
     const ratings = await this.dbHandler.getBabySitterRating(babysitterId);
     const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
     console.log(average);
     return average;
  };

  getParent = async (parentId: number): Promise<Recommendation[]> => {
    return this.dbHandler.getParentRecommendation(parentId);
  };

  getRecommendationByBabysitterAndParent = async (
    parentId: number,
    babysitter: number
  ): Promise<Recommendation[]> => {
    return this.dbHandler.getParentBabysitterRecommendation(
      parentId,
      babysitter
    );
  };

  postRecommendation = async (data: Recommendation): Promise<void> => {
    return this.dbHandler.addRecommendation({
      babysitterId: data.babysitterId,
      parentId: data.parentId,
      rating: data.rating,
      recommendationText: data.recommendationText,
    });
  };
}
