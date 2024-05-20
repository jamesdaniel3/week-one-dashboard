import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, hw1, hw2, hw3, project, midterm, final, overall) {
  return { name, hw1, hw2, hw3, project, midterm, final, overall };
}

const rows = [
  createData('Jimmy Joe', 100, 100, 100, 100, 100, 100, 100),
  createData('John Doe', 90, 90, 90, 90, 90, 90, 90),
  createData('Jane Doe', 80, 80, 80, 80, 80, 80, 80),
  createData('Billy Bob', 70, 70, 70, 70, 70, 70, 70),
  createData('Sammy Smith', 60, 60, 60, 60, 60, 60, 60),
];

export default function GradeTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell align="right">Hw #1</TableCell>
            <TableCell align="right">Hw #2</TableCell>
            <TableCell align="right">Hw #3</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Midterm</TableCell>
            <TableCell align="right">Final</TableCell>
            <TableCell align="right">Final Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.hw1}</TableCell>
              <TableCell align="right">{row.hw2}</TableCell>
              <TableCell align="right">{row.hw3}</TableCell>
              <TableCell align="right">{row.project}</TableCell>
              <TableCell align="right">{row.midterm}</TableCell>
              <TableCell align="right">{row.final}</TableCell>
              <TableCell align="right">{row.overall}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
