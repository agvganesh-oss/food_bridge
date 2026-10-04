import React from 'react';
import { DonationStatus, TrackingHistoryItem } from '../types';
import { Check, Clock, CircleDot, ArrowDown } from 'lucide-react';

interface TrackingTimelineProps {
  currentStatus: DonationStatus;
  history?: TrackingHistoryItem[];
  compact?: boolean;
}

const ORDERED_STEPS: DonationStatus[] = [
  'Available',
  'Accepted',
  'Pickup Scheduled',
  'Collected',
  'Distributed',
];

const STEP_LABELS: Record<DonationStatus, string> = {
  'Available': 'Posted',
  'Accepted': 'Accepted',
  'Pickup Scheduled': 'Pickup Scheduled',
  'Collected': 'Collected',
  'Distributed': 'Distributed',
};

const STEP_DESCRIPTIONS: Record<DonationStatus, string> = {
  'Available': 'Donor posted surplus food details.',
  'Accepted': 'NGO/Volunteer claimed the donation.',
  'Pickup Scheduled': 'Volunteer transport & pickup time assigned.',
  'Collected': 'Food verified and picked up from donor location.',
  'Distributed': 'Safe meals handed over to beneficiaries.',
};

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  currentStatus,
  history = [],
  compact = false,
}) => {
  const currentIndex = ORDERED_STEPS.indexOf(currentStatus);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto py-2">
        {ORDERED_STEPS.map((step, idx) => {
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <React.Fragment key={step}>
              <div
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md shrink-0 transition-colors ${
                  isCurrent
                    ? 'bg-emerald-100 text-[#14532d] font-semibold border border-emerald-300'
                    : isPassed
                    ? 'bg-stone-100 text-stone-700 font-medium'
                    : 'text-stone-400'
                }`}
              >
                {isPassed ? (
                  <Check className="w-3.5 h-3.5 text-[#14532d]" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block text-[10px] text-center leading-3">
                    {idx + 1}
                  </span>
                )}
                <span>{STEP_LABELS[step]}</span>
              </div>
              {idx < ORDERED_STEPS.length - 1 && (
                <span className="text-stone-300 text-xs shrink-0">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ORDERED_STEPS.map((step, idx) => {
        const isPassed = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const stepHistoryItem = history.find((h) => h.status === step);

        return (
          <div key={step} className="relative flex items-start gap-4">
            {/* Connecting vertical line */}
            {idx < ORDERED_STEPS.length - 1 && (
              <div
                className={`absolute left-3.5 top-8 w-0.5 h-10 transition-colors ${
                  idx < currentIndex ? 'bg-[#14532d]' : 'bg-stone-200'
                }`}
              />
            )}

            {/* Status Icon */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                isCurrent
                  ? 'bg-[#14532d] text-white shadow-sm ring-4 ring-emerald-100'
                  : isPassed
                  ? 'bg-[#166534] text-white'
                  : 'bg-stone-100 text-stone-400 border border-stone-300'
              }`}
            >
              {isPassed ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <span className="text-xs font-semibold">{idx + 1}</span>
              )}
            </div>

            {/* Step text content */}
            <div className="flex-1 pb-4">
              <div className="flex items-baseline justify-between gap-2">
                <h4
                  className={`text-sm font-semibold ${
                    isCurrent
                      ? 'text-[#14532d]'
                      : isPassed
                      ? 'text-stone-900'
                      : 'text-stone-400'
                  }`}
                >
                  {isPassed ? `✓ ${STEP_LABELS[step]}` : `○ ${STEP_LABELS[step]}`}
                </h4>
                {stepHistoryItem && (
                  <span className="text-xs text-stone-500 tabular-nums">
                    {stepHistoryItem.timestamp}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 mt-0.5">
                {stepHistoryItem?.note || STEP_DESCRIPTIONS[step]}
              </p>

              {stepHistoryItem?.actor && (
                <div className="mt-1 text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">Handler:</span> {stepHistoryItem.actor}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
