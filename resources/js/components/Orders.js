import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, a, b, c, d, e, f, g, h, i) {
  return { id, a, b, c, d, e, f, g, h, i };
}

const rows = [
  createData(0, 'Jewelry Blue Color', 213, 35, '$ 34.00', 3.44, 5, 'No', 'No', 'Todo'),
  createData(1, 'Christmas Packaging Jewelry', 434, 34, '$ 35.00', 4.99, 2, 'No', 'Yes', 'Todo'),
  createData(2, 'Red Jewellery', 6, 54, '$ 52.00', 6.81, 5, 'Yes', 'Soon', 'Todo'),
  createData(3, 'Paper Jewelry Earring', 3, 5, '$ 23.00', 3.39, 1, 'No', 'No', 'Todo'),
  createData(4, 'Square Shape Jewelry Earrings', 3, 6, '$ 33.00', 5.79, 0, 'No', 'Soon', 'Todo'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Inventories</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>FBA stock</TableCell>
            <TableCell>Reserved</TableCell>
            <TableCell>Stock value</TableCell>
            <TableCell>Estimated sales velocity</TableCell>
            <TableCell>Days of stock left</TableCell>
            <TableCell>Running out of stock</TableCell>
            <TableCell>Time to reorder</TableCell>
            <TableCell align="right">Todo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.a}</TableCell>
              <TableCell>{row.b}</TableCell>
              <TableCell>{row.c}</TableCell>
              <TableCell>{row.d}</TableCell>
              <TableCell align="right">{row.e}</TableCell>
              <TableCell>{row.f}</TableCell>
              <TableCell>{row.g}</TableCell>
              <TableCell>{row.h}</TableCell>
              <TableCell>{row.i}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more products
        </Link>
      </div>
    </React.Fragment>
  );
}