import React, {useState, useEffect} from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart } from "react-google-charts";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [datevsales, setDatevsales] = useState([]);
  const [salesDate, setSalesDate] = useState([]);
  const [ordervdate, setOrdervdate] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [sales, setSales] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [porcessingCount, setPorcessingCount] = useState(0);
  const [holdCount, setHoldCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);
  useEffect(() => {
    async function loadOrdervsales(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/ordervsales/data");
      const temp = await res.json();
      let date_arr = temp.map( t => t.date_created_new);
      date_arr.unshift("-");
      let sales_arr = temp.map( t => t.total_orders);
      sales_arr.unshift("0");
      setOrdervdate(sales_arr);
      setOrderDate(date_arr);
    }
    loadOrdervsales();

    async function loadDatevsales(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/datevsales/data");
      const temp = await res.json();
      let date_arr = temp.map( t => t.date_created_new);
      let sales_arr = temp.map( t => t.sales);
      setDatevsales(sales_arr);
      setSalesDate(date_arr);
    }
    loadDatevsales();

    async function loadChartData(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/chart/data");
      const temp = await res.json();
      temp.map(t => {
        if(t.status === "wc-cancelled"){
         setCancelCount(t.status_count);
        }
        else if(t.status === "wc-completed"){
          setCompleteCount(t.status_count);
        }
        else if(t.status === "wc-on-hold"){
          setHoldCount(t.status_count);
        }
        else if(t.status === "wc-processing"){
          setPorcessingCount(t.status_count);
        }
        return 0;
      });
    }
    loadChartData();

    async function loadSalesData(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/sales/data");
      const temp = await res.json();
      setSales(temp[0].Sales);
    }
    loadSalesData();

    async function loadCustomerData(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/customer/data");
      const temp = await res.json();
      setCustomerCount(temp[0].Unique_Customers);
    }
    loadCustomerData();
  }, [])

  const dashboardEmailStatisticsChart = {
    data: (canvas) => {
      return {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: [holdCount, completeCount, porcessingCount, cancelCount],
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };

  const dashboard24HoursPerformanceChart = {
    data: (canvas) => {
      return {
        labels: salesDate,
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            // pointRadius: 0,
            pointHoverRadius: 10,
            borderWidth: 3,
            tension: 0,
            fill: false,
            data: datevsales,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        y: {
          ticks: {
            color: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 20,
            color: "#9f9f9f",
          },
        },
      },
    },
  };
  
  const dashboardNASDAQChart = {
    data: (canvas) => {
      return {
        labels: orderDate,
        datasets: [
          {
            data: ordervdate,
            fill: false,
            borderColor: "#51CACF",
            backgroundColor: "transparent",
            pointBorderColor: "#51CACF",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
      },
    },
  };

  const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category"> Total Orders</p>
                      <CardTitle tag="p">{parseInt(completeCount)+parseInt(holdCount)+parseInt(porcessingCount)+parseInt(cancelCount)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">₹{sales}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Customer Count</p>
                      <CardTitle tag="p">{customerCount}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Dashboard Status</p>
                      <CardTitle tag="p">Live</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
                <CardHeader>
                  <CardTitle tag="h5"> GEO localtion (Fake Data right now)</CardTitle>
                </CardHeader>
                <CardBody>
                  <Chart
                    chartEvents={[
                      {
                        eventName: "select",
                        callback: ({ chartWrapper }) => {
                          const chart = chartWrapper.getChart();
                          const selection = chart.getSelection();
                          if (selection.length === 0) return;
                          const region = data[selection[0].row + 1];
                          console.log("Selected : " + region);
                        },
                      },
                    ]}
                    chartType="GeoChart"
                    width="100%%"
                    height="400px"
                    data={data}
                  />
                </CardBody>
              </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Sales vs Time</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5"> Order Status Stats </CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Complete ({completeCount}){" "}
                  <i className="fa fa-circle text-warning" /> In-Progress ({porcessingCount}){" "}
                  <i className="fa fa-circle text-danger" /> Cancel ({cancelCount}){" "}
                  <i className="fa fa-circle text-gray" /> On Hold ({holdCount}){" "}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Orders vs Time</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
