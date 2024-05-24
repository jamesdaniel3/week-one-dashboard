import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import fetchStudents from "../utils/fetchStudents";
import {TextField} from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [year, month, day] = row.info.birthday.split('-').map(num => parseInt(num, 10));
  const birthdayDate = new Date(year, month - 1, day);

  //format the date
  const formattedBirthday = birthdayDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>

            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.number}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Student Information
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Birthday</TableCell>
                      <TableCell>{formattedBirthday}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Phone Number</TableCell>
                      <TableCell>{row.info.phone_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Address</TableCell>
                      <TableCell>{row.info.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    info: PropTypes.shape({
      number: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function DirectoryTable() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.student_number.includes(searchTerm)
  );

  return (
      <>
        <TextField
            label="Search by Name or Student Number"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Student Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                  <Row key={student.id} row={{
                    number: student.student_number,
                    name: student.name,
                    email: student.email,
                    info: {
                      birthday: student.birthday,
                      phone_number: student.phone_number,
                      address: student.address,
                    }
                  }} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
}
