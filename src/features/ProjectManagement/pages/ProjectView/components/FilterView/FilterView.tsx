import React, { useState } from 'react';
import styles from './FilterView.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface FilterProps {
  handleDateChange: (action: string, type: string) => void
  startDate: string
  endDate: string
  type: string
  handleChange: (event: SelectChangeEvent) => void
  setStartDate: React.Dispatch<React.SetStateAction<string>>
  setEndDate: React.Dispatch<React.SetStateAction<string>>
}
const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3
};
function FilterView ({ handleDateChange, startDate, endDate, type, handleChange, setStartDate, setEndDate }: FilterProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setStartDate('');
    setEndDate('');
    setOpen(true);
  };
  const handleClose = (): void => setOpen(false);
  const time = {
    isoWeek: 'Week',
    month: 'Month',
    quarter: 'Quarter',
    year: 'Year',
    allTime: 'All Time',
    customTime: <span onClick={handleOpen}>Custom Time</span>
  };
    type ObjectKey = keyof typeof time;
    const [valueStart, setValueStart] = useState<string>('');
    const [valueEnd, setValueEnd] = useState<string>('');
    const handleSubmit = (): void => {
      setStartDate(moment(new Date(valueStart)).format('DD/MM/YY'));
      setEndDate(moment(new Date(valueEnd)).format('DD/MM/YY'));
      setValueStart('');
      setValueEnd('');
      handleClose();
    };

    return (
      <div className={styles.filter}>
        <div className={styles.itemLeft}>
          <button className={styles.btnAngle} onClick={() => handleDateChange('minus', type)}><FaAngleLeft /></button>
          <button className={styles.btnAngle} onClick={() => handleDateChange('plus', type)}><FaAngleRight /></button>
          <p>{time[type as ObjectKey]}{(type !== 'allTime') && <>: {startDate} - {endDate}</>}</p>
        </div>
        <div className={styles.itemRight}>
          <div>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <Select
                value={type}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue='isoWeek'
              >
                {Object.entries(time).map(([key, value], index) => (
                  <MenuItem key={index} value={key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button className='btnCreate'>Export</button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.modal}>
              <div className={styles.fromDate}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker format="DD/MM/YY" label="From Date" value={valueStart} onChange={(newValue) => setValueStart(newValue as string)} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker format="DD/MM/YY" label="To Date" value={valueEnd} onChange={(newValue) => setValueEnd(newValue as string)} />
                </DemoContainer>
              </LocalizationProvider>
              <div className={styles.btnModal}>
                <button className={styles.btnCancel} onClick={handleClose}>Cancel</button>
                <button className='btnCreate' onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
}
export default FilterView;
