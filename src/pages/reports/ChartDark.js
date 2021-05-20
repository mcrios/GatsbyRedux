import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import HighchartsStockChart from "highcharts";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: '#0D2430',
    color: '#FFFFFF'
  }
}));

const ChartDark = ({ db, name, className, ...rest }) => {

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      style: {
        fontFamily: 'Hind',
      },
      backgroundColor: '#0D2430'
    },
    title: {
      text: name,
      style: {
        color: '#FFFFFF ',
        font: '"Hind", sans-serif'
      }
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y} GB</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true
      },
    },
    legend: {
      labelFormatter: function () {
        return this.name + ': ' + this.y + ' GB';
      },
      itemStyle: {color: '#FFFFFF', fontSize: '14px', fontFamily: 'Hind'}
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Almacenamiento",
        colorByPoint: true,
        data: [
          {
            name: "Disponible",
            color: "#47B865",
            y: Number(typeof db !== 'undefined' ? parseFloat(db["AVAIL"] / 1024 / 1024).toFixed(2) : 0)
          },
          {
            name: "Usada",
            color: "#C40039",
            y: Number(typeof db !== 'undefined' ? parseFloat(db["USED"] / 1024 / 1024).toFixed(2) : 0)
          },
        ],
      },
    ],
  }

  const classes = useStyles()

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <div>
          <HighchartsReact
            highcharts={HighchartsStockChart}
            options={options}
          />
        </div>
        <center>
          <div style={{ fontWeight: 'bold' }}>
            TOTAL: {parseFloat(Number(typeof db !== 'undefined' ? parseFloat(db["USED"] / 1024 / 1024).toFixed(2) : 0)
            + Number(typeof db !== 'undefined' ? parseFloat(db["AVAIL"] / 1024 / 1024).toFixed(2) : 0)).toFixed(2)}GB
          </div>
        </center>
      </CardContent>
    </Card>
  )
}

ChartDark.propTypes = {
  className: PropTypes.string,
}

export default ChartDark
