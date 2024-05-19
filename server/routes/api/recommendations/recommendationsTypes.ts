export type Recommendation = {
  parentId: number;
  babysitterId: number;
  rating: number;
  recommendationText: string;
};

export type Validation = { isValid: boolean; message?: string };
