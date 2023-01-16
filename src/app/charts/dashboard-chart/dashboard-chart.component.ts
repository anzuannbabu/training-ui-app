import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { ChartService } from 'src/app/services/chart.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor(private chartService: ChartService) {
    this.chartOptions = {
      series: [
        // {
        //   name: 'series1',
        //   data: [11, 32, 45, 32, 34, 52, 41],
        // },
        // {
        //   name: "series2",
        //   data: [11, 32, 45, 32, 34, 52, 41]
        // }
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          // '2018-09-19T00:00:00.000Z',
          // '2018-09-19T01:30:00.000Z',
          // '2018-09-19T02:30:00.000Z',
          // '2018-09-19T03:30:00.000Z',
          // '2018-09-19T04:30:00.000Z',
          // '2018-09-19T05:30:00.000Z',
          // '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
  ngOnInit(): void {
    //on init method
    this.chartService.get().subscribe((res) => {
      console.log('chart data => ', res);
      //set x-axis and y-axis
      const data:any[] = [];
      const dates:any[] = [];
      res.forEach((_data) => {
        data.push(_data.revenue);
        dates.push(_data.date);
        this.chartOptions.xaxis?.categories.push(_data.date);
      });

      //add the data into the graph
      this.chartOptions.series?.push(
        {
          name: 'series1',
          data: data,
        },
      )




    });
  }

  // public generateData(baseval:any, count:any, yrange:any) {
  //   var i = 0;
  //   var series:any[] = [];
  //   while (i < count) {
  //     var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  //     var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

  //     series.push([x, y, z]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }
}
