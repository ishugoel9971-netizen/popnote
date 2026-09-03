import { motion } from 'framer-motion';
import { Activity, BellOff, MessageCircle, RadioTower } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockMessages } from '../data/mockMessages';
import type { FilterSettings } from '../types';
import { runFocusPulseFilter } from '../utils/filterEngine';
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
  const filterResult = useMemo(() => runFocusPulseFilter(mockMessages, settings), [settings]);

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
        <ControlPanel settings={settings} onChange={setSettings} />

        <div className="space-y-5">
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
            <div className="rounded-lg bg-surface p-8 shadow-soft">
              <div>
                <p className="text-sm font-medium text-appleBlue">FocusPulse</p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                  Fewer notifications. More attention.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                  {filterResult.monitored.length} unread messages are organized locally across enabled channels.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatusRing label="WhatsApp" active={settings.enabledPlatforms.WhatsApp} value={filterResult.platformTotals.WhatsApp} />
              <StatusRing label="Instagram" active={settings.enabledPlatforms.Instagram} value={filterResult.platformTotals.Instagram} />
              <StatusRing label="Saved" active value={filterResult.savedPercent} suffix="%" />
              <StatusRing label="Priority" active={filterResult.alerts.length > 0} value={filterResult.alerts.length} />
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Unread" value={String(filterResult.monitored.length)} detail="Messages in the local sample set" icon={<RadioTower size={22} />} />
            <MetricCard label="Quieted" value={String(filterResult.blocked)} detail="Low-priority items moved aside" icon={<BellOff size={22} />} tone="violet" />
            <MetricCard label="Status" value="On" detail="Filtering runs in browser state" icon={<Activity size={22} />} />
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="glass rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Priority</p>
                  <h2 className="mt-1 text-xl font-semibold text-ink">Important Messages</h2>
                </div>
                <MessageCircle className="text-appleBlue" size={22} />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {filterResult.alerts.slice(0, 6).map((alert) => (
                  <CrucialAlertCard alert={alert} key={alert.id} />
                ))}
              </div>
            </div>

            <div className="glass rounded-lg p-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Today</p>
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

function StatusRing({
  label,
  active,
  value,
  suffix = '',
}: {
  label: string;
  active: boolean;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="glass rounded-lg p-4 text-center">
      <div className={`soft-ring mx-auto grid h-24 w-24 place-items-center rounded-full border ${active ? 'border-appleBlue/20 bg-softBlue text-appleBlue' : 'border-line bg-neutral-100 text-muted'}`}>
        <span className="text-2xl font-semibold">
          {value}
          {suffix}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{label}</p>
      <p className={`mt-1 text-xs ${active ? 'text-appleBlue' : 'text-muted'}`}>{active ? 'On' : 'Paused'}</p>
    </div>
  );
}
