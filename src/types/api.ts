export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  average_price?: number;
  brand_id: number;
}

export interface CreateBrandRequest {
  name: string;
}

export interface CreateModelRequest {
  name: string;
  average_price?: number;
}

export interface UpdateModelRequest {
  average_price?: number;
}

export interface ModelsFilter {
  greater?: number;
  lower?: number;
}

// Recommendations types
export interface Recommendation {
  id: string;
  brand_id: number;
  model_id?: number;
  content: string;
  created_at: string;
}

export interface RecommendationResponse {
  success: boolean;
  data: Recommendation | Recommendation[];
}

export interface GenerateRecommendationRequest {
  brand_id: number;
  model_id?: number;
}
