import DBHandler from "./recommendationsDBHandler";
import { Recommendation } from "./recommendationsTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getPreview = async (): Promise<Recommendation[]> => {
    return this.dbHandler.getRecommendationPreview();
  };

  getBabysitter = async (babysitterId: number): Promise<Recommendation[]> => {
    return this.dbHandler.getBabySitterRecommendation(babysitterId);
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
}
