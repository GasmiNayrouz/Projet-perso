export interface Document {
  id?: number;
  serialNumber: string;
  type: string;
  status: 'vierge' | 'en_cours' | 'personnalise' | 'rejete';
  createdAt?: Date;
}
