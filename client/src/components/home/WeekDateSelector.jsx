/**
 * Week Date Selector matching Figma:
 * - 7 days (Mon to Sun)
 * - Day abbreviation (M, T, W, T, F, S, S)
 * - Date number (e.g. 9, 10, 11...)
 * - Selected date highlighted as a solid blue rounded block
 */

export default function WeekDateSelector({
  selectedDate,
  onSelectDate,
  weekDays = [],
}) {
  return (
    <div className="w-full flex items-center justify-between gap-1 py-1">
      {weekDays.map((item, idx) => {
        const isSelected = selectedDate === item.isoDate

        return (
          <button
            key={item.isoDate || idx}
            type="button"
            onClick={() => onSelectDate?.(item.isoDate)}
            className={`flex flex-col items-center justify-center py-2.5 px-2.5 sm:px-3 rounded-2xl transition-all duration-150 cursor-pointer select-none min-w-[40px]
              ${
                isSelected
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-[1.02]'
                  : 'bg-white border border-border/60 text-text-secondary hover:border-primary-300 hover:text-text-primary'
              }`}
          >
            <span className={`text-[11px] font-medium mb-1 ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
              {item.dayName}
            </span>
            <span className="text-xs sm:text-sm font-bold">
              {item.dateNum}
            </span>
          </button>
        )
      })}
    </div>
  )
}
