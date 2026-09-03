import { Bell, Hash, Instagram, Plus, SlidersHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { FilterSettings, Platform } from '../types';

interface ControlPanelProps {
  settings: FilterSettings;
  onChange: (settings: FilterSettings) => void;
}

export function ControlPanel({ settings, onChange }: ControlPanelProps) {
  const [vipInput, setVipInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const addTag = (type: 'vipNames' | 'priorityKeywords', value: string) => {
    const next = value.trim();
    if (!next || settings[type].some((item) => item.toLowerCase() === next.toLowerCase())) return;
    onChange({ ...settings, [type]: [...settings[type], next] });
  };

  const removeTag = (type: 'vipNames' | 'priorityKeywords', value: string) => {
    onChange({ ...settings, [type]: settings[type].filter((item) => item !== value) });
  };

  const togglePlatform = (platform: Platform) => {
    onChange({
      ...settings,
      enabledPlatforms: {
        ...settings.enabledPlatforms,
        [platform]: !settings.enabledPlatforms[platform],
      },
    });
  };

  return (
    <aside className="glass h-full rounded-lg p-5">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Settings</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">Focus Controls</h2>
        </div>
        <SlidersHorizontal className="text-appleBlue" size={22} />
      </div>

      <label className="block">
        <span className="flex items-center justify-between text-sm text-muted">
          Notification limit
          <span className="font-medium text-ink">{settings.threshold} unread</span>
        </span>
        <input
          className="mt-4 w-full accent-appleBlue"
          type="range"
          min="5"
          max="120"
          value={settings.threshold}
          onChange={(event) => onChange({ ...settings, threshold: Number(event.target.value) })}
        />
      </label>

      <div className="mt-8 space-y-4">
        <PlatformToggle
          label="WhatsApp"
          active={settings.enabledPlatforms.WhatsApp}
          icon={<Bell size={17} />}
          onClick={() => togglePlatform('WhatsApp')}
        />
        <PlatformToggle
          label="Instagram"
          active={settings.enabledPlatforms.Instagram}
          icon={<Instagram size={17} />}
          onClick={() => togglePlatform('Instagram')}
        />
      </div>

      <TagEditor
        icon={<Bell size={16} />}
        label="VIP Names"
        value={vipInput}
        tags={settings.vipNames}
        onInput={setVipInput}
        onAdd={() => {
          addTag('vipNames', vipInput);
          setVipInput('');
        }}
        onRemove={(tag) => removeTag('vipNames', tag)}
      />

      <TagEditor
        icon={<Hash size={16} />}
        label="Priority Keywords"
        value={keywordInput}
        tags={settings.priorityKeywords}
        onInput={setKeywordInput}
        onAdd={() => {
          addTag('priorityKeywords', keywordInput);
          setKeywordInput('');
        }}
        onRemove={(tag) => removeTag('priorityKeywords', tag)}
      />
    </aside>
  );
}

function PlatformToggle({
  label,
  active,
  icon,
  onClick,
}: {
  label: string;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="flex h-12 w-full items-center justify-between rounded-lg border border-line/70 bg-white px-4 text-left text-sm text-ink transition hover:border-appleBlue/40"
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center gap-3">
        <span className="text-appleBlue">{icon}</span>
        {label}
      </span>
      <span className={`h-6 w-11 rounded-full p-1 transition ${active ? 'bg-appleBlue' : 'bg-neutral-300'}`}>
        <span className={`block h-4 w-4 rounded-full bg-white shadow-sm transition ${active ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}

function TagEditor({
  icon,
  label,
  value,
  tags,
  onInput,
  onAdd,
  onRemove,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tags: string[];
  onInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (tag: string) => void;
}) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
        <span className="text-appleBlue">{icon}</span>
        {label}
      </div>
      <div className="flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-appleBlue"
          placeholder="Add name or word"
          value={value}
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onAdd();
          }}
        />
        <button
          className="grid h-10 w-10 place-items-center rounded-lg bg-appleBlue text-white transition hover:bg-blue-600"
          type="button"
          onClick={onAdd}
          aria-label={`Add ${label}`}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            className="rounded-full border border-line bg-neutral-100 px-3 py-1 text-xs text-muted transition hover:border-appleBlue/40 hover:text-ink"
            key={tag}
            type="button"
            onClick={() => onRemove(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
