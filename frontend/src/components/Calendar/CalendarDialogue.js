import * as React from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label}
    </Button>
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{ ...props.slotProps, field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField({ selectedDate, onDateChange }) {
  const handleDateChange = (newValue) => {
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={selectedDate.format('MMMM')}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
