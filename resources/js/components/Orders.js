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

// function preventDefault(event) {
//   event.preventDefault();
// }

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


export default function Orders(props) {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [sku, setSku] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter
  const handleSkuChange = event => {
    setSku(event.target.value);
  };
  const handleFromChange = event => {
    setFrom(event.target.value);
  };
  const handleToChange = event => {
    setTo(event.target.value);
  };


  const handleFilterSubmit = event => {
    const GetData = async () => {

      // const domainUrl = 'http://127.0.0.1:8000';
      const domainUrl = 'https://django-amazon-api.herokuapp.com';

      const searchUrl = `${domainUrl}/api/transaction/?types=Order&from_date=${from}&to_date=${to}&sku=${sku}`;
      const result = await axios(searchUrl);
      setData(result.data);

      var totalSales = 0;
      result.data.map(row => {
        totalSales += row.total * 1;
      });

      const fromDate = new Date(result.data[0].date_time);
      const toDate = new Date(result.data.slice(-1)[0].date_time);
      // toDate.setDate(toDate.getDate() - 1);

      const months = [
        { 'month': 'January', 'total': 200 },
        { 'month': 'February', 'total': 300 },
        { 'month': 'March', 'total': 800 },
        { 'month': 'April', 'total': 400 },
        { 'month': 'May', 'total': 600 },
      ];

      props.onUpdateTotalSale(totalSales, fromDate.toLocaleDateString(), toDate.toLocaleDateString());
      props.onUpdateMonthChart(months);

    }
    GetData();
  };

  useEffect(() => {
    handleFilterSubmit();
  }, []);

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
              defaultValue={sku}
              onChange={handleSkuChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="from"
              label="From"
              type="date"
              defaultValue={from}
              onChange={handleFromChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="to"
              label="To"
              type="date"
              defaultValue={to}
              onChange={handleToChange}
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
              onClick={handleFilterSubmit}
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
