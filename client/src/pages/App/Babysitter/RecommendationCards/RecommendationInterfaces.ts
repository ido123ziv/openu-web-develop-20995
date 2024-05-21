export interface RecommendationCard {
  id: number;
  parentName: string;
  rating: number;
  recommendation: string;
}

export interface RecommendationCardArr {
  data: RecommendationCard[];
}
