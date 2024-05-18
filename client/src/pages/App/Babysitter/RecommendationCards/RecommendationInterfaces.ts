export interface RecommendationCard {
  id: number;
  parentId: number;
  parentName: string;
  rating: number;
  recommendation: string;
}

export interface RecommendationCardArr {
  data: RecommendationCard[];
}
