import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  // Badge,
  Button, Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  Col, Container, Form, //Form,
  FormGroup,
  // FormText,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  //InputGroup,
  TabContent,
  // Table,
  TabPane
} from 'reactstrap';
import config from "../../Config/assets";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles


import $ from 'jquery';
// import assets from "../../Config/assets";

window.jQuery = $;
require('bootstrap');

class CreateProduct extends Component {

  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      investor: {
        name: "",
        username: "",
        password: "",
        phone: "",
        type: "",
        tag: "",
        email: "",
      },
      alert: null,
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  AddInvestor() {
    // let data = this.state.investor;
    let requestData = this.state.investor;

    let url ='https://secure-mountain-93147.herokuapp.com/api/user';
    // let token = localStorage.getItem('token');
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        // "authorization": "Bearer " + token,
      }),
      body: JSON.stringify( requestData)
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => this.props.history.push('/account/users')}
            >
              {responseJson.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert()
          });
        } else {
          const getAlert = () => (
            <SweetAlert
              // success
              timeout={1500}
              onConfirm={() => this.hideAlert()}
            >
              {responseJson.errors.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert()
          });
        }

      })
      .catch((err) => console.log(err))
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }


  onChange(content) {
    console.log(content);
    this.setState({
      investor: {
        ...this.state.investor,
        description: content
      }
    });
  }

  componentDidMount() {
  }






  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }


  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      investor:
        {
          ...this.state.investor,
          [input.name]: input.value
        }
    });
    console.log(input.name,input.value);
  };



  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Card>

            <CardBody>
              <div id="AddInvestor">

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Delivery Unit</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" required onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Shipper</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="username" id="username" required name="username"
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password">Receiving Address</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="password" id="password" required name="password"
                           onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="phone">Receiver Phone</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="phone" id="phone" name="phone" required autoComplete="phone"
                           onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email">Cost</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" required autoComplete="email"
                           onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Receive Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="type" id="type" required autoComplete="type" onChange={(event) => this.handleChangeData(event)}>

                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="type">Status</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="type" id="type" name="type" required
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="type">Status</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="type" id="type" name="type" required
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit" onClick={() => {
                    this.props.history.push("/account/users");
                  }}>Hủy</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          onClick={() => this.AddInvestor()}>Hoàn thành</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </TabPane>
      </>
    )
      ;
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <p className="font-weight-bold">ADD NEW DELIVERY</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
              {this.state.alert}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CreateProduct;
