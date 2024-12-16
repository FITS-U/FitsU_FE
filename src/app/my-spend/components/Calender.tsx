import { formatCalenderPrice } from '@/utils/formatPrice';
import { useMonthlyStore } from '@/store/monthlyStore';
import React from 'react';

interface CalendarProps {
  expenses: Record<number, number>; // 날짜와 소비 데이터 매핑
  incomes: Record<number, number>;
}

const Calendar: React.FC<CalendarProps> = ({ expenses, incomes }) => {
  const { currentYear, currentMonth } = useMonthlyStore();

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const weeks: (number | null)[][] = [];

  // 주 단위로 날짜 배열 생성
  let week: (number | null)[] = Array(7).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week[(firstDay + day - 1) % 7] = day;
    if ((firstDay + day - 1) % 7 === 6 || day === daysInMonth) {
      weeks.push(week);
      week = Array(7).fill(null);
    }
  }

  return (
    <div className="text-contrast-300 overflow-auto">
      <div className="grid grid-cols-7 text-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-sm font-semibold text-contrast-200">{day}</div>
        ))}
        {weeks.map((week, index) => (
          <React.Fragment key={index}>
            {week.map((day, idx) => (
              <div key={idx} className="p-4 text-sm">
                {day && (
                  <div className='flex flex-col items-center justify-center'>
                    {expenses[day] !== undefined ? (
                      <div className="text-contrast-200">
                        <div>{day}</div>
                        <div className={`text-xs text-center text-contrast-200 tracking-tighter
                          ${expenses[day] < 0 ? "text-orange-500" : ""}`}
                        >
                          {formatCalenderPrice(expenses[day])}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className='text-contrast-400'>{day}</div>
                      </div>
                    )}
                    {incomes[day] !== undefined ? (
                      <div className="text-xs text-center text-contrast-200 tracking-tighter">
                        +{formatCalenderPrice(incomes[day])}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
