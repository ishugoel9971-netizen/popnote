import type { MockMessage, Platform } from '../types';

const platforms: Platform[] = ['WhatsApp', 'Instagram'];

const fillerChats = [
  'Family Central',
  'Design Memes',
  'Apartment 7B',
  'Weekend Crew',
  'College Batch',
  'Gym Squad',
  'Coupon Stream',
  'Reels Inbox',
  'Street Food Hunters',
  'Project Side Quest',
];

const fillerSenders = [
  'Aarav',
  'Maya',
  'Rohan',
  'Nina',
  'Dev',
  'Priya',
  'Kabir',
  'Anika',
  'Zoya',
  'Ishaan',
  'SaleBot',
  'Cafe Halo',
  'TrendWire',
  'Neighbour Desk',
];

const fillerContents = [
  'Can someone react to the latest reel? It is too dramatic.',
  'Dinner plan is still on for 8 PM, table is booked.',
  'Forwarded a coupon code. It expires tonight apparently.',
  'There are 12 new photos from the cafe meet.',
  'Poll is open for movie night. Vote before evening.',
  'Someone left a charger in the lobby.',
  'The playlist has been updated with the new tracks.',
  'Reminder that the society meeting moved by 30 minutes.',
  'Shared the meme thread again because nobody acknowledged it.',
  'Flash sale link dropped. Probably another promo blast.',
  'Birthday cake preference discussion is now oddly intense.',
  'Can we move the workout slot to tomorrow morning?',
  'Traffic is rough near the metro, take the inner road.',
  'Dinner headcount is confirmed, no more changes please.',
  'Who has the presentation template from last semester?',
];

const urgentMessages: Omit<MockMessage, 'id' | 'read'>[] = [
  {
    platform: 'WhatsApp',
    sender: 'Boss',
    chat: 'Leadership Sync',
    content: 'Urgent: client deadline moved to 5 PM. Need your final deck in the next hour.',
    minutesAgo: 8,
  },
  {
    platform: 'WhatsApp',
    sender: 'Wife',
    chat: 'Home',
    content: 'Please call me when you see this. It is important and time sensitive.',
    minutesAgo: 14,
  },
  {
    platform: 'Instagram',
    sender: 'Maya',
    chat: 'Maya',
    content: 'Emergency at the venue, the booking manager needs confirmation now.',
    minutesAgo: 21,
  },
  {
    platform: 'WhatsApp',
    sender: 'Finance Team',
    chat: 'Q4 Budget',
    content: 'Deadline alert: approval required before payroll lock closes.',
    minutesAgo: 33,
  },
  {
    platform: 'Instagram',
    sender: 'Boss',
    chat: 'Boss',
    content: 'Can you approve the launch caption urgently? We are holding the post.',
    minutesAgo: 47,
  },
  {
    platform: 'WhatsApp',
    sender: 'Mom',
    chat: 'Family Central',
    content: 'Doctor appointment changed to today. Please confirm you saw this.',
    minutesAgo: 54,
  },
  {
    platform: 'WhatsApp',
    sender: 'Security Desk',
    chat: 'Apartment 7B',
    content: 'Important: package with documents needs pickup before office closes.',
    minutesAgo: 69,
  },
  {
    platform: 'Instagram',
    sender: 'Client Liaison',
    chat: 'Client Liaison',
    content: 'Critical update: final asset sizes are wrong, deadline is still tonight.',
    minutesAgo: 82,
  },
];

const generatedMessages = Array.from({ length: 112 }, (_, index): MockMessage => {
  const platform = platforms[index % platforms.length];
  const chat = fillerChats[index % fillerChats.length];
  const sender = fillerSenders[(index * 3) % fillerSenders.length];
  const content = fillerContents[(index * 5) % fillerContents.length];

  return {
    id: index + 1,
    platform,
    sender,
    chat,
    content,
    minutesAgo: 3 + index * 4,
    read: false,
  };
});

export const mockMessages: MockMessage[] = [
  ...urgentMessages.map((message, index) => ({
    ...message,
    id: 900 + index,
    read: false,
  })),
  ...generatedMessages,
].sort((a, b) => a.minutesAgo - b.minutesAgo);
