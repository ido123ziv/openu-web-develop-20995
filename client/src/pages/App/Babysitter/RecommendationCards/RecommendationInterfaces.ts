export interface RecommendationCard {
  id: number;
  parentName: string;
  rating: number;
  recommendationText: string;
}

export interface RecommendationCardArr {
  data: RecommendationCard[];
}
