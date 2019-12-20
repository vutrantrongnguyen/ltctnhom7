import React, {Component} from 'react';
import {
  Button,
  // Badge, Button,
  Card,
  CardBody, CardHeader, CardFooter,
  // CardHeader,
  Col,
  // Form, FormGroup,
  Input,
  // ListGroup, ListGroupItem,
  // InputGroup, InputGroupAddon,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  // TabContent,
  // Table,
  // TabPane,
  FormGroup, Label, Table, TabPane
} from 'reactstrap';
// import CardFooter from "reactstrap/es/CardFooter";
import Spinner from "reactstrap/es/Spinner";
import config from "../../Config/strings";

class OrderDetail extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    const ACCOUNT_ID = this.props.match.params.id;
    this.state = {
      accountId: ACCOUNT_ID,
      activeTab: new Array(4).fill('1'),
      description: "",
      avatarPath: "",
      email: "",
      numberPhone: "",
      address: "",
      name: "",
      tag: "",
      isLoaded: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.getAccountDetailById(this.state.accountId);
  }

  updateAccountInfo(userId) {
    let mobilePhone = this.state.data.mobilePhone;
    let address = this.state.data.address;
    let givenName = this.state.data.givenName;
    let name = this.state.data.name;
    let token = localStorage.getItem('token');
    let url = config.api_url + "/users/" + userId;
    fetch(url, {
      method: 'PUT',
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      }),
      body: JSON.stringify({
        "user": {
          // "avatar_path": avatarPath,
          "mobile_phone": mobilePhone,
          "address": address,
          "given_name": givenName,
          "name": name,
        }
      })
    }).then((res) => res.json())
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err))
  }

  getAccountDetailById(accountId) {
    // let token = localStorage.getItem('token');
    let url =  "https://sp-04-order.herokuapp.com/api/order/";
    fetch(url + accountId, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data);
      this.setState({data: responseJson, isLoaded: true
        // , origin: JSON.parse(JSON.stringify(responseJson.data))
      });
      // localStorage.setItem('data', JSON.stringify(responseJson.data));
    }, function (error) {
    })
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  closeEditingForm() {
    let data = this.state.data;
    data = this.state.origin;
    this.state.isEditing = false;
    this.setState(data);
  }

  static triggerUploadImage() {
    document.getElementById("avatar-path").click();
  }


  isEditing() {
    if (!this.state.isEditing) {
      return (
        <Row>
          <Col sm="12" xl="12">

          </Col>
        </Row>
      )
    } else {

  }
  }
  tabPane() {
    let data = this.state.data;

    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardHeader>
              <div>
                <Row style={{marginTop:10}}>
                  {/*<Col sm="12" xl="3">*/}
                  {/*  <div style={{height: 120, width: 120, background: 'whitesmoke', float: 'left'}} className="avatar avatar-online avatar-lg m-5">*/}
                  {/*    <img src={data && data.avatar || "/assets/img/logo-placeholder.png"} style={{height: 120,borderRadius:50 }} />*/}
                  {/*  </div>*/}
                  {/*</Col>*/}
                  <Row>
                    <Col sm="6" xl="12">
                      <div>
                        <h3>{data.id}</h3>
                      </div>
                    </Col>
                    <Col sm="12" xl="4">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.user.name}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col sm="12" xl="4">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Phone</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.user.phone}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col sm="12" xl="4">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Address</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.user.address}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </Row>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Row>
                  <Col xs="12" md="8">
                    <Table responsive>
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>subTotal</th>
                      </tr>
                      </thead>
                      <tbody>
                      {data.products.map(item =>{return(
                        <tr>
                          <th>{item.id}</th>
                          <th>{item.quantity}</th>
                          <th>{item.name}</th>
                          <th>{item.price}</th>
                          <th>{item.subTotal}</th>
                        </tr>
                      ) })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="12" md="4">
                    <strong>Delivery</strong>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Status</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.delivery.status}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup>
                    </p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Fee</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.delivery.fee}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Date</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.delivery.date}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <strong>Payment</strong>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Type</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.payment.type}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Status</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.payment.status}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <strong>Another Information</strong>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Order status</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.status}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Discount</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.discount}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Total value</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.totalValue}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Warranty</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={data.warranty}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    {/*<p>Địa chỉ: {data.address}</p>*/}
                  </Col>
                  {/*<Col xs="12" md="4">*/}
                  {/*  <p>Số lần bị report: </p>*/}
                  {/*</Col>*/}
                </Row>
              </div>
            </CardBody>
            <CardFooter>
              <div className="form-actions">
                <Button className="mr-1 btn-danger" type="submit"
                        onClick={() => this.props.history.goBack()}>Hủy</Button>
                <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                        onClick={() => this.updateAccountInfo(this.state.data.id)}>Cập nhật</Button>
              </div>
            </CardFooter>
          </Card>
        </TabPane>
      </>
    )
      ;
  }
  render() {

    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      // let data = this.state.data;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">CHI TIẾT ĐƠN HÀNG </p>
            </Col>
          </Row>
          {this.tabPane()}
          <div className="form-actions">
          </div>

        </div>
      );
    }
  }
}

export default OrderDetail;
