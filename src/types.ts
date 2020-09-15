type DateFormat = 'yyyy-MM-dd' | 'yy-MM-dd' | 'MM/dd/yyyy' | 'MM/dd/yy';

export type DateOverflow = 'blanks' | 'dates';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface PickrConfig {
  initialDate?: Date | number;
  initialRange?: { start: Date | number; end: Date | number };
  inputDisplayFormat?: DateFormat;
  rangeOverflow?: 'blanks' | 'dates' | 'none';
  dateDisplay?: 'normal' | 'padded';
}

export interface PickrDate {
  label: string;
  key: number;
  inCurrentRange: boolean;
  onClick: () => void;
}

export interface PickrBag {
  currentDate: Date;
  dates: PickrDate[];
}
