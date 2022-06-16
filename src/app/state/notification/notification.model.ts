export interface Notification {
  insights_type: string;
  insights: Insight[];
}

export interface Insight {
  id: number;
  username: string;
  message: string;
  saved: boolean;
  erased: boolean;
  created_at: string;
  expires_at: string;
  checked?: boolean;
  url?: string;
}

export interface SendEmail {
  'recipients[]': string[];
  'id[]': number[];
  'note': string;
}

export function createNotification(params: Partial<Notification>) {
  return {

  } as Notification;
}
