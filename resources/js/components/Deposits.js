import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import NumberFormat from 'react-number-format';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 0,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Sales</Title>
      <Typography component="p" variant="h4">
        <NumberFormat value={props.totalSale} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} />
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.fromDate ? 'From ' + props.fromDate : ''}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.toDate ? 'To ' + props.toDate : ''}
      </Typography>

    </React.Fragment>
  );
}