import { Input } from "@chakra-ui/react";
import { handleDateChange } from "../util/handlers";

export interface DatePickerProps {
    isoDate: string;
    onDateChange: (date: string) => void;
  }
const DatePicker = ({ isoDate, onDateChange }: DatePickerProps) => {
    return (
        <Input
            placeholder="Select a date"
            bg="#d6dfe688"
            size="md"
            type="date"
            value={isoDate}
            onChange={(event) => handleDateChange({ event, onDateChange })}
        />
    );
};

export default DatePicker;