import type { CarContent, ContentCheckResult } from '../types/content';

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

// TODO: Replace with your actual database implementation
// This is now using the recommendations API endpoints
class ContentService {
  async checkContentExists(
    brand: string,
    model: string,
    year: number = 2025
  ): Promise<ContentCheckResult> {
    try {
      // First, we need to get the brand and model IDs from the API
      const brands = await fetch(`${API_BASE_URL}/brands`);
      const brandsData = await handleResponse<any[]>(brands);

      const brandData = brandsData.find(b => b.name.toLowerCase() === brand.toLowerCase());

      if (!brandData) {
        return { exists: false };
      }

      const models = await fetch(`${API_BASE_URL}/brands/${brandData.id}/models`);
      const modelsData = await handleResponse<any[]>(models);

      const modelData = modelsData.find(m => m.name.toLowerCase() === model.toLowerCase());

      if (!modelData) {
        return { exists: false };
      }

      // Now check if recommendation exists
      const recommendationResponse = await fetch(
        `${API_BASE_URL}/api/brands/${brandData.id}/models/${modelData.id}/recommendation`
      );

      if (recommendationResponse.ok) {
        const recommendationData = await recommendationResponse.json();

        if (recommendationData.success && recommendationData.data) {
          const content: CarContent = {
            id: recommendationData.data.id,
            brand: brand,
            model: model,
            year: year,
            content: recommendationData.data.content,
            generatedAt: new Date(recommendationData.data.created_at),
            updatedAt: new Date(recommendationData.data.created_at),
          };

          return {
            exists: true,
            content: content,
          };
        }
      }

      return { exists: false };
    } catch (error) {
      console.error('Error checking content existence:', error);
      return { exists: false };
    }
  }

  async saveContent(
    brand: string,
    model: string,
    year: number,
    content: string
  ): Promise<CarContent> {
    try {
      // First, we need to get the brand and model IDs from the API
      const brands = await fetch(`${API_BASE_URL}/brands`);
      const brandsData = await handleResponse<any[]>(brands);

      const brandData = brandsData.find(b => b.name.toLowerCase() === brand.toLowerCase());

      if (!brandData) {
        throw new Error(`Brand ${brand} not found`);
      }

      const models = await fetch(`${API_BASE_URL}/brands/${brandData.id}/models`);
      const modelsData = await handleResponse<any[]>(models);

      const modelData = modelsData.find(m => m.name.toLowerCase() === model.toLowerCase());

      if (!modelData) {
        throw new Error(`Model ${model} not found for brand ${brand}`);
      }

      // Generate recommendation using the API
      const response = await fetch(
        `${API_BASE_URL}/api/brands/${brandData.id}/models/${modelData.id}/recommendation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await handleResponse<any>(response);

      if (result.success && result.data) {
        const savedContent: CarContent = {
          id:
            result.data.id || `${brand}-${model}-${year}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          brand: brand,
          model: model,
          year: year,
          content: result.data.recommendation || content,
          generatedAt: new Date(result.data.created_at || new Date()),
          updatedAt: new Date(result.data.created_at || new Date()),
        };

        return savedContent;
      } else {
        throw new Error('Failed to generate recommendation');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  }

  async getContent(brand: string, model: string, year: number = 2025): Promise<CarContent | null> {
    const result = await this.checkContentExists(brand, model, year);
    return result.content || null;
  }
}

export const contentService = new ContentService();
