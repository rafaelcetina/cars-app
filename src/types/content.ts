export interface CarContent {
  id: string;
  brand: string;
  model: string;
  year: number;
  content: string;
  generatedAt: Date;
  updatedAt: Date;
}

export interface ContentCheckResult {
  exists: boolean;
  content?: CarContent;
}
