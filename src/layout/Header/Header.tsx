import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getQuantityProjectAction } from 'src/redux/actions/projects';
import { stateType } from 'src/features/ProjectManagement/type';

interface HeaderProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  status: number
  setStatus: React.Dispatch<React.SetStateAction<number>>
}

function Header ({ search, setSearch, status, setStatus }: HeaderProps): JSX.Element {
  const handleChangeStatus = (event: SelectChangeEvent): void => {
    setStatus(Number(event.target.value));
  };
  useEffect(() => {
    setSearchValue(search);
  }, []);
  const [searchValue, setSearchValue] = useState('');
  const handleKeyDown = (e: { key: string }): void => {
    if (e.key === 'Enter') {
      setSearch(searchValue);
    }
  };
  const dispatch = useDispatch();
  const fetchQuantityProject = async (): Promise<void> => {
    dispatch(await getQuantityProjectAction());
  };
  useEffect(() => {
    void fetchQuantityProject();
  }, [dispatch]);
  const quantity = useSelector((state: stateType) => state.projects.quantity);
  const quantityActive: number = quantity[0]?.quantity;
  const quantityDeactive: number = quantity[1]?.quantity;
  const quantityAll: number = quantityActive + quantityDeactive;
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Project</h2>
        </div>
        <div className={styles.filters}>
          <div >
            <Link to='/project/create'>
              <button className='btnCreate'>
                <MdAdd className={styles.icon} />
                <p>New Project</p>
              </button>
            </Link>
          </div>
          <div className={styles.search}>
            <TextField value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={handleKeyDown} id="fullWidth" label="Search by client or project name" variant="outlined" size='small' />
          </div>
          <div>
            <FormControl sx={{ minWidth: 220 }} size="small">
              <Select
                value={status.toString()}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue={status.toString()}
              >
                <MenuItem value={'0'}>Active Projects ({quantityActive})</MenuItem>
                <MenuItem value={'1'}>Deactive Projects ({quantityDeactive})</MenuItem>
                <MenuItem value={'2'}>All Projects ({quantityAll})</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
