import React from 'react';
import PropTypes from 'prop-types';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'order_id', numeric: false, disablePadding: false, label: 'Order ID' },
  { id: 'settlement_id', numeric: true, disablePadding: false, label: 'Settlement ID' },
  { id: 'sku', numeric: false, disablePadding: false, label: 'SKU' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'product_sales', numeric: true, disablePadding: false, label: 'Product Sales' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

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
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Orders(props) {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [sku, setSku] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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

      var totalSale = 0;
      var fromDateText = '';
      var toDateText = '';
      var monthDataAll = [];
      var monthData = [];
      var total = 0;

      if (result.data.length) {

        result.data.map(row => {
          totalSale += parseInt(row.total);
          const month = new Date(result.data[0].date_time).toLocaleDateString("en-US", { month: 'long' });
          total = parseInt(row.total);
          monthDataAll.push({ month, total })
        });

        fromDateText = new Date(result.data[0].date_time).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        const toDate = new Date(result.data.slice(-1)[0].date_time);
        toDate.setDate(toDate.getDate() - 1);
        toDateText = toDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

        // Group Months
        monthDataAll.reduce(function (res, value) {
          if (!res[value.month]) {
            res[value.month] = { month: value.month, total: 0 };
            monthData.push(res[value.month])
          }
          res[value.month].total += value.total;
          return res;
        }, {});

      }

      props.onUpdateTotalSale(totalSale, fromDateText, toDateText, sku);
      props.onUpdateMonthChart(monthData, sku);
      setData(result.data);
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
      <Table stickyHeader aria-label="sticky table" size='small'>
        <EnhancedTableHead
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={data.length}
        />
        <TableBody>
          {stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <React.Fragment key={row.id}>
                  <TableRow >
                    <TableCell component="th" scope="row" title={row.date_time}>
                      {row.order_id}
                    </TableCell>
                    <TableCell align="center">{row.settlement_id}</TableCell>
                    <TableCell align="center">{row.sku}</TableCell>
                    <TableCell align="left" >
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.product_sales}</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: (33) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
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
