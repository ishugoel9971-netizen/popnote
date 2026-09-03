export type Platform = 'WhatsApp' | 'Instagram';

export interface MockMessage {
  id: number;
  platform: Platform;
  sender: string;
  chat: string;
  content: string;
  minutesAgo: number;
  read: boolean;
}

export interface FilterSettings {
  threshold: number;
  vipNames: string[];
  priorityKeywords: string[];
  enabledPlatforms: Record<Platform, boolean>;
}

export interface CrucialAlert extends MockMessage {
  reason: string;
  severity: 'critical' | 'high';
}

export interface SmartSummary {
  id: string;
  platform: Platform;
  chat: string;
  count: number;
  senders: string[];
  summary: string;
}
