import { Input } from "@chakra-ui/react"

const DatePicker = ({ isoDate, onDateChange }) => {

    const handleDateChange = (event) => {
        const inputValue = event.target.value;
        let newDate;

        if (inputValue) {
            newDate = new Date(inputValue);
        } else {
            newDate = new Date(new Date().toLocaleDateString());
        }

        // Adjust for the time zone offset
        const offsetMinutes = newDate.getTimezoneOffset();
        newDate = new Date(newDate.getTime() + offsetMinutes * 60 * 1000);

        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
        const day = newDate.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        onDateChange(formattedDate);
    }

    return (
        <Input
            placeholder="Select a date"
            bg="#d6dfe688"
            size="md"
            type="date"
            value={isoDate}
            onChange={handleDateChange}
        />
    )
}
export default DatePicker