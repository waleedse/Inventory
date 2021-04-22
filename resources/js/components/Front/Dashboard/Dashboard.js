import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWallet, faShoppingBag, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

const generateTopWidget = (icon, title, text ,index) => {
    return (
      <Container fluid className="col-6 col-lg-3 p-3 mt-3" key={index}>
        <Card className="card-signin  animate_auth_modal" style={{ background: '#EDF2F7', borderRadius: '0' }}>
          <Card.Body >
            <Row>
              <Container className="col-12 col-lg-3 d-flex justify-content-center text-center mb-3 mb-lg-0">
                <Container className="my-auto align-middle">
                  <i  className={"fa-2x " + icon} />
                </Container>
              </Container>
              <Container className="col-12 col-lg-9 text-center">
                <h4>{typeof text !== 'number' ? text : <CountUp end={text} duration={4} />}</h4>
                <small className="text-uppercase text-muted">{title}</small>
              </Container>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  };
class User_Dashborad extends Component {
    constructor(props) {
        super(props);
        this.state={
            todays_invoices:0,
            sales:0,
            products:0,
            revenue:0,
            dates:[],
            dates_invoices:[],

              data_2 :{
                datasets: [
                  {
                    data: [10, 20, 30],
                    backgroundColor: ['red', '#2ecc71', '#3498db'],
                  },
                ],
                labels: ['Red', 'Yellow', 'Blue'],
              },

              data_3 : {
                datasets: [
                  {
                    data: [60, 80, 20],
                    backgroundColor: ['red', '#44bd32', '#0097e6'],
                  },
                ],
                labels: ['Red', 'Yellow', 'Blue'],
              }
        }

    }

    componentDidMount(){
        let senderdata = {
            user_id:this.props.user.id,
            token:window.localStorage.getItem('key1')
        }

        Axios.post('/api/get_admin_dash_data',senderdata).then(res=>{
            this.setState({
                todays_invoices:res.data.todays_invoices,
                sales:res.data.todays_sales,
                revenue:res.data.revenue,
                products:res.data.products,
                dates:res.data.dates,
                dates_invoices:res.data.date_invoices
            })
        })
    }
    render() {
      const data = {
        labels: this.state.dates,
        datasets: [
          {
            label: 'Recent days Invoices Data Set',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.dates_invoices,
          },
        ],
      }
        return (
            <Container fluid id="dashboard">
      <Row>
        {[
          { i: 'fas fa-file-invoice', t: 'Todays Invoices', s: this.state.todays_invoices },
          { i: 'far fa-calendar-check', t: 'Todays Sales', s: this.state.sales },
          { i: 'fas fa-hand-holding-usd', t: 'Todays Revenue', s: this.state.revenue },
          { i: 'fas fa-box-open', t: 'Total Products', s: this.state.products },
        ].map((w,index) => generateTopWidget(w.i, w.t, w.s,index))}
      </Row>

      {/* <Container fluid style={{ background: '#EDF2F7', borderRadius: '0' }}>
        <Bar data={data} width={100} height={50} options={{ maintainAspectRatio: false }} />
      </Container> */}
      <Row>
        <Container fluid className="col-12 col-lg-8 p-3">
          <Container fluid className="p-3" style={{ background: '#EDF2F7', border: '1px solid rgba(0,0,0,.125)' }}>
            <small className="text-uppercase text-muted mb-3">Invoices Sales</small>
            <Container>
              <Line data={data} />
            </Container>
          </Container>
        </Container>
        <Container fluid className="col-12 col-lg-4 p-3">
          <Container fluid className="p-3" style={{ background: '#EDF2F7', border: '1px solid rgba(0,0,0,.125)' }}>
            <small className="text-uppercase text-muted mb-3">Products</small>
            <Container>
              <Doughnut
                data={this.state.data_2}
                options={{
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                }}
              />
            </Container>
            <hr />
            <small className="text-uppercase text-muted mb-3">Sales</small>
            <Container>
              <Doughnut
                data={this.state.data_3}
                options={{
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                }}
              />
            </Container>
          </Container>
        </Container>
      </Row>
    </Container>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(User_Dashborad);
