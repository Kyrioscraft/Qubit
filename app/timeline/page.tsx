import { getAllTimelineEvents, getYearlyTimelineSummary, EventTypeLabels } from '@/lib/content/timeline';
import { TimelineEventItem } from '@/components/content/TimelineEventItem';

export default function TimelinePage() {
  const events = getAllTimelineEvents();
  const yearlySummary = getYearlyTimelineSummary();

  // 按年份分组
  const eventsByYear: Record<number, typeof events> = {};
  for (const event of events) {
    const year = event.date.getFullYear();
    if (!eventsByYear[year]) {
      eventsByYear[year] = [];
    }
    eventsByYear[year].push(event);
  }

  // 按年份降序排序
  const years = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">时间线</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          个人里程碑记录 - 记录成长历程中的重要事件
        </p>
      </header>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

        {/* Years */}
        {years.map((year) => (
          <section key={year} className="mb-12">
            {/* Year Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold">
                {year.slice(-2)}
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-text)]">
                {year}
              </h2>
              <span className="text-sm text-[var(--color-text-muted)]">
                {eventsByYear[Number(year)].length} 个事件
              </span>
            </div>

            {/* Events */}
            <div className="ml-12 space-y-6">
              {eventsByYear[Number(year)]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((event) => (
                  <TimelineEventItem key={event.id} event={event} />
                ))}
            </div>
          </section>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无事件记录</p>
        </div>
      )}
    </div>
  );
}