import * as React from 'react';
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

function createData(id, name, email, number, birthday, address) {
  return {
    name,
    email, 
    number,
    info: [
      {
        id: id, 
      },
      {
        birthday: birthday,
      },
      {
        address: address,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
                <TableHead>
                  <TableRow>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.info.map((infoRow) => (
                    <TableRow key={infoRow.id}>
                      <TableCell component="th" scope="row">{infoRow.id}</TableCell>
                      <TableCell>{infoRow.birthday}</TableCell>
                      <TableCell>{infoRow.address}</TableCell>
                    </TableRow>
                  ))}
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    info: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
    birthday: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData(1, 'Alice', 'alice@jefferson.edu', 1111111111, 'Jan 1, 2016', '111 Idk Street, Some City, CA, 11111'),
  createData(2, 'Bob', 'Bob@jefferson.edu', 2222222222, 'Dec 31, 2016', '111 Idk Street, Some City, CA, 11111'),
]
//         { id: 1, name: 'Alice', exam1: 85, exam2: 90, exam3: 78, finalExam: 88, overallGrade: 85.25 },
//         { id: 2, name: 'Bob', exam1: 75, exam2: 80, exam3: 70, finalExam: 82, overallGrade: 76.75 },
//         { id: 3, name: 'Charlie', exam1: 95, exam2: 85, exam3: 92, finalExam: 91, overallGrade: 90.75 },
//         { id: 4, name: 'Sammy Smith', exam1: 88, exam2: 92, exam3: 85, finalExam: 90, overallGrade: 88.75 },
//         { id: 5, name: 'Jamie Joe', exam1: 82, exam2: 79, exam3: 88, finalExam: 85, overallGrade: 83.5 },
//         { id: 6, name: 'John Smith', exam1: 90, exam2: 85, exam3: 87, finalExam: 89, overallGrade: 87.75 },
//         { id: 7, name: 'Jane Doe', exam1: 78, exam2: 82, exam3: 80, finalExam: 84, overallGrade: 81 },
//         { id: 8, name: 'Josh Jameson', exam1: 93, exam2: 88, exam3: 90, finalExam: 95, overallGrade: 91.5 },
//         { id: 9, name: 'Daniel Smith', exam1: 85, exam2: 90, exam3: 88, finalExam: 92, overallGrade: 88.75 },
//         { id: 10, name: 'Julia Roberts', exam1: 89, exam2: 85, exam3: 90, finalExam: 88, overallGrade: 88 },
//         { id: 11, name: 'Justice Truth', exam1: 80, exam2: 83, exam3: 85, finalExam: 87, overallGrade: 83.75 },
//         { id: 12, name: 'Hunter Fisher', exam1: 92, exam2: 88, exam3: 85, finalExam: 90, overallGrade: 88.75 },
//         { id: 13, name: 'Frankie Barns', exam1: 78, exam2: 82, exam3: 80, finalExam: 84, overallGrade: 81 },
//         { id: 14, name: 'Johnny Appleseed', exam1: 85, exam2: 90, exam3: 92, finalExam: 91, overallGrade: 89.5 },
//         { id: 15, name: 'Jimmy Joe', exam1: 82, exam2: 88, exam3: 85, finalExam: 89, overallGrade: 86 },
//         { id: 16, name: 'Billy Bob', exam1: 90, exam2: 85, exam3: 87, finalExam: 89, overallGrade: 87.75 },
// ];

export default function DirectoryTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}