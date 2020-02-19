import React from 'react';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';

import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react'
// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  grid: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  filter: {
    width: 100,
  },
}));


export default function Orders() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    const GetData = async () => {
      const result = await axios('https://django-amazon-api.herokuapp.com/api/transaction/?types=Order');
      console.log(result.data)
      setData(result.data);
    }
    GetData();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs>
          <Title>Orders</Title>
        </Grid>

        <Grid item xs >

          <Grid container alignItems="flex-start" justify="flex-end" direction="row" className={classes.grid}>
            <TextField
              id="sku"
              label="SKU"
              type="text"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="from"
              label="From"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="to"
              label="To"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.filter}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Grid>
        </Grid>



      </Grid>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="center">Settlement ID</TableCell>
            <TableCell align="center">SKU</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Product Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
            return (
              <React.Fragment key={row.id}>
                <TableRow >
                  <TableCell component="th" scope="row">
                    {row.order_id}
                  </TableCell>
                  <TableCell align="center">{row.settlement_id}</TableCell>
                  <TableCell align="center">{row.sku}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.product_sales}</TableCell>
                </TableRow>
              </React.Fragment>

            );
          })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment >
  );
}