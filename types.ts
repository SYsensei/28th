export enum AppStage {
  LOCKED = 'LOCKED',
  VERIFYING = 'VERIFYING',
  REVEAL = 'REVEAL'
}

export interface DogMessage {
  headline: string;
  body: string;
  signature: string;
}

export interface SecurityLog {
  id: number;
  text: string;
  status: 'pending' | 'success' | 'warning';
}