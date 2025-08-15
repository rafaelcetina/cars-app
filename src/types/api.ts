export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  average_price: number;
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
  average_price: number;
}

export interface ModelsFilter {
  greater?: number;
  lower?: number;
}
