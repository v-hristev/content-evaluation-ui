import React, { useState } from "react";
import DatePicker from 'react-datepicker';

export interface ICalendarProps {
    start?: Date;
    end?: Date;
    onChange: (start: Date, end: Date) => void;
}

interface ICalendarState {
    startDate: Date | null;
    endDate: Date | null;
}

export const Calendar = ({
    start,
    end,
    onChange
}: ICalendarProps) => {
    const [calendarDates, setCalendarDates] = useState<ICalendarState>({
        startDate: start || null,
        endDate: end || null,
    });
    
    const onChangeHandler = (dates: any) => {
        const [start, end] = dates;
        setCalendarDates({
            startDate: start,
            endDate: end,
        });
        onChange(start, end);
    };

    return (
        <DatePicker
            selected={calendarDates.startDate}
            onChange={onChangeHandler}
            startDate={calendarDates.startDate}
            endDate={calendarDates.endDate}
            selectsRange
            inline
        />
    );
};