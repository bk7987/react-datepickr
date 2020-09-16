type DateFormat = 'yyyy-MM-dd' | 'yy-MM-dd' | 'MM/dd/yyyy' | 'MM/dd/yy';

export type DateOverflow = 'blanks' | 'dates';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface OptionalDateRange {
  start?: Date;
  end?: Date;
}

export type DisabledRange = OptionalDateRange | OptionalDateRange[];

export interface PickrConfig {
  initialDate?: Date | number;
  initialRange?: { start: Date | number; end: Date | number };
  dateDisplayFormat?: DateFormat;
  rangeOverflow?: 'blanks' | 'dates' | 'none';
  padDates?: boolean;
  dayOfWeekLabels?: { [key: number]: string };
  monthLabels?: { [key: number]: string };
  disabled?: (dateProps: {
    date: Date;
    inCurrentRange: boolean;
    isSelected: boolean;
  }) => DisabledRange | boolean;
}

export interface PickrDate {
  label: string;
  key: number;
  inCurrentRange: boolean;
  isSelected: boolean;
  disabled: boolean;
  date: Date;
  onSelect: () => void;
}

export interface PickrBag {
  currentDate: Date;
  displayDate: string;
  dates: PickrDate[];
  onSelectNextRange: () => void;
  onSelectPrevRange: () => void;
  dayOfWeekLabels: string[];
  currentMonthLabel: string;
  currentYearLabel: string;
}
