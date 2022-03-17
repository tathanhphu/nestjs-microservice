export interface QUERY {
  name?: string;
  priceRange?: {
    min?: number,
    max: number
  },
  brand?: string,
  colour: string
}