import type { CrucialAlert, FilterSettings, MockMessage, SmartSummary } from '../types';

const includesAny = (value: string, tokens: string[]) => {
  const normalized = value.toLowerCase();
  return tokens.some((token) => token.trim() && normalized.includes(token.toLowerCase()));
};

const summaryTemplates = [
  'Logistics, reactions, and casual updates were grouped into one low-priority digest.',
  'Plans are mostly confirmed; no direct action is needed right now.',
  'Repeated chat chatter and promo-style content were muted into a compact summary.',
  'Conversation continued without a direct mention or high-priority keyword.',
];

export function runFocusPulseFilter(messages: MockMessage[], settings: FilterSettings) {
  const monitored = messages.filter((message) => settings.enabledPlatforms[message.platform]);
  const thresholdBreached = monitored.length > settings.threshold;

  const alerts = monitored
    .filter((message) => {
      const senderMatch = includesAny(message.sender, settings.vipNames);
      const keywordMatch = includesAny(message.content, settings.priorityKeywords);
      return senderMatch || keywordMatch;
    })
    .map<CrucialAlert>((message) => {
      const senderMatch = includesAny(message.sender, settings.vipNames);
      const keywordMatch = includesAny(message.content, settings.priorityKeywords);
      return {
        ...message,
        reason: senderMatch ? 'VIP sender detected' : 'Priority keyword match',
        severity: senderMatch && keywordMatch ? 'critical' : 'high',
      };
    })
    .sort((a, b) => a.minutesAgo - b.minutesAgo);

  const alertIds = new Set(alerts.map((alert) => alert.id));
  const muted = monitored.filter((message) => !alertIds.has(message.id));
  const grouped = muted.reduce<Record<string, MockMessage[]>>((acc, message) => {
    const key = `${message.platform}:${message.chat}`;
    acc[key] = [...(acc[key] ?? []), message];
    return acc;
  }, {});

  const summaries = Object.entries(grouped)
    .map<SmartSummary>(([id, group], index) => ({
      id,
      platform: group[0].platform,
      chat: group[0].chat,
      count: group.length,
      senders: Array.from(new Set(group.map((message) => message.sender))).slice(0, 4),
      summary: summaryTemplates[index % summaryTemplates.length],
    }))
    .filter((summary) => summary.count > 2)
    .sort((a, b) => b.count - a.count);

  const blocked = Math.max(0, monitored.length - alerts.length);
  const savedPercent = monitored.length ? Math.round((blocked / monitored.length) * 100) : 0;

  return {
    monitored,
    alerts,
    summaries,
    blocked,
    savedPercent,
    thresholdBreached,
    platformTotals: {
      WhatsApp: monitored.filter((message) => message.platform === 'WhatsApp').length,
      Instagram: monitored.filter((message) => message.platform === 'Instagram').length,
    },
  };
}

export function formatElapsed(minutesAgo: number) {
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hours = Math.floor(minutesAgo / 60);
  const minutes = minutesAgo % 60;
  return minutes ? `${hours}h ${minutes}m ago` : `${hours}h ago`;
}
