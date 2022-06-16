export interface ChangeLevel {
  data: {
    name: string;
    level: number;
  }[];
  type: 'donnut' | 'column';
}
