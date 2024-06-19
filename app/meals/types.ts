export interface IMealResponse {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface IMealPayload {
  title: string;
  slug?: string;
  summary: string;
  instructions: string;
  image: File | string;
  creator: string;
  creator_email: string;
}