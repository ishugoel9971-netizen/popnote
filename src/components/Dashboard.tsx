import { motion } from 'framer-motion';
import { Activity, BellOff, MessageCircle, RadioTower } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockMessages } from '../data/mockMessages';
import type { FilterSettings } from '../types';
import { runPopnoteFilter } from '../utils/filterEngine';
import { ControlPanel } from './ControlPanel';
import { CrucialAlertCard } from './CrucialAlertCard';
import { MetricCard } from './MetricCard';
import { SmartSummaryFeed } from './SmartSummaryFeed';

const initialSettings: FilterSettings = {
  threshold: 20,
  vipNames: ['Boss', 'Wife', 'Mom'],
  priorityKeywords: ['urgent', 'deadline', 'emergency', 'critical', 'important'],
  enabledPlatforms: {
    WhatsApp: true,
    Instagram: true,
  },
};

export function Dashboard() {
  const [settings, setSettings] = useState(initialSettings);
  const filterResult = useMemo(() => runPopnoteFilter(mockMessages, settings), [settings]);

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ControlPanel settings={settings} onChange={setSettings} />

        <div className="order-1 space-y-5 lg:order-2">
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-lg bg-surface p-7 shadow-soft sm:p-8">
              <div>
                <p className="text-sm font-medium text-appleBlue">Popnote</p>
                <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
                  Fewer notifications. More attention.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                  {filterResult.monitored.length} unread messages are organized locally across enabled channels.
                </p>
              </div>
            </div>

            <ChannelPanel
              instagram={filterResult.platformTotals.Instagram}
              priorityCount={filterResult.alerts.length}
              savedPercent={filterResult.savedPercent}
              settings={settings}
              whatsapp={filterResult.platformTotals.WhatsApp}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Unread" value={String(filterResult.monitored.length)} detail="Messages available in this demo" icon={<RadioTower size={22} />} />
            <MetricCard label="Set aside" value={String(filterResult.blocked)} detail="Lower-priority items grouped quietly" icon={<BellOff size={22} />} tone="violet" />
            <MetricCard label="Status" value="Ready" detail="Preferences update instantly" icon={<Activity size={22} />} />
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="glass rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Priority</p>
                  <h2 className="mt-1 text-xl font-semibold text-ink">Priority Inbox</h2>
                </div>
                <MessageCircle className="text-appleBlue" size={22} />
              </div>

              {filterResult.alerts.length ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {filterResult.alerts.slice(0, 6).map((alert) => (
                    <CrucialAlertCard alert={alert} key={alert.id} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-line/80 bg-white p-6 text-sm text-muted">
                  No priority messages match your current contacts and keywords.
                </div>
              )}
            </div>

            <div className="glass rounded-lg p-5">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Today</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">Notification Savings</h2>
              <div className="mt-5 space-y-4">
                {[
                  ['Group chats', 42],
                  ['Promo blasts', 31],
                  ['Social reactions', 24],
                  ['Casual pings', 18],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-ink">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                      <motion.div
                        className="h-full rounded-full bg-appleBlue"
                        initial={{ width: 0 }}
                        animate={{ width: `${Number(value) * 2}%` }}
                        transition={{ duration: 0.9 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SmartSummaryFeed summaries={filterResult.summaries} />
        </div>
      </div>
    </main>
  );
}

function ChannelPanel({
  instagram,
  priorityCount,
  savedPercent,
  settings,
  whatsapp,
}: {
  instagram: number;
  priorityCount: number;
  savedPercent: number;
  settings: FilterSettings;
  whatsapp: number;
}) {
  const rows = [
    { label: 'WhatsApp', value: whatsapp, state: settings.enabledPlatforms.WhatsApp ? 'On' : 'Paused' },
    { label: 'Instagram', value: instagram, state: settings.enabledPlatforms.Instagram ? 'On' : 'Paused' },
    { label: 'Saved today', value: `${savedPercent}%`, state: 'Quieted' },
    { label: 'Priority', value: priorityCount, state: priorityCount ? 'Review' : 'Clear' },
  ];

  return (
    <div className="glass rounded-lg p-5">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Channels</p>
      <div className="mt-4 divide-y divide-line/70">
        {rows.map((row) => (
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0" key={row.label}>
            <div>
              <p className="text-sm font-medium text-ink">{row.label}</p>
              <p className="mt-0.5 text-xs text-muted">{row.state}</p>
            </div>
            <p className="text-xl font-semibold text-ink">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
