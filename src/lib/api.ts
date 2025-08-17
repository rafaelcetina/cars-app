import type {
  Brand,
  Model,
  CreateBrandRequest,
  CreateModelRequest,
  UpdateModelRequest,
  ModelsFilter,
  RecommendationResponse,
} from '../types/api';

const API_BASE_URL = 'https://cars-api.rafaelcetina.com';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Brands
  async getBrands(): Promise<Brand[]> {
    const response = await fetch(`${API_BASE_URL}/brands`);
    return handleResponse<Brand[]>(response);
  },

  async createBrand(brand: CreateBrandRequest): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brand),
    });
    return handleResponse<Brand>(response);
  },

  // Models
  async getModelsByBrand(brandId: number): Promise<Model[]> {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/models`);
    return handleResponse<Model[]>(response);
  },

  async createModel(brandId: number, model: CreateModelRequest): Promise<Model> {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/models`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model),
    });
    return handleResponse<Model>(response);
  },

  async updateModel(modelId: number, model: UpdateModelRequest): Promise<Model> {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model),
    });
    return handleResponse<Model>(response);
  },

  async getModels(filters?: ModelsFilter): Promise<Model[]> {
    const params = new URLSearchParams();
    if (filters?.greater) params.append('greater', filters.greater.toString());
    if (filters?.lower) params.append('lower', filters.lower.toString());

    const url = `${API_BASE_URL}/models${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse<Model[]>(response);
  },

  // Recommendations
  async generateBrandRecommendation(brandId: number): Promise<RecommendationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/brands/${brandId}/recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<RecommendationResponse>(response);
  },

  async generateModelRecommendation(
    brandId: number,
    modelId: number
  ): Promise<RecommendationResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/brands/${brandId}/models/${modelId}/recommendation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return handleResponse<RecommendationResponse>(response);
  },

  async getBrandRecommendations(brandId: number): Promise<RecommendationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/brands/${brandId}/recommendations`);
    return handleResponse<RecommendationResponse>(response);
  },

  async getModelRecommendation(brandId: number, modelId: number): Promise<RecommendationResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/brands/${brandId}/models/${modelId}/recommendation`
    );
    return handleResponse<RecommendationResponse>(response);
  },
};
