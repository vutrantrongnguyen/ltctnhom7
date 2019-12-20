import React, {Component} from 'react';
import {
  // Button,
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
  Row, TabPane, FormGroup, Label, Button,
  // TabContent,
  // Table,
  // TabPane,
  // FormGroup, Label
} from 'reactstrap';
// import CardFooter from "reactstrap/es/CardFooter";
import Spinner from "reactstrap/es/Spinner";
import config from "../../Config/strings";

class DeliveryDetail extends Component {

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
    let url = "https://online-selling-website.herokuapp.com/deliveries/";
    fetch(url + accountId, {
      method: "GET",
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data);
      this.setState({data: responseJson, isLoaded: true, origin: JSON.parse(JSON.stringify(responseJson))});
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
    let data = this.state.data;

    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardHeader>
              <div>
                <Row style={{marginTop:10}}>

                  <Row>
                    <Col sm="12" xl="12">
                      <div>
                        <h3>{data.order_id}</h3>
                      </div>
                    </Col>

                  </Row>
                </Row>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Row>
                  <Col xs="12" md="12">
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Delivery unit id</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={this.state.data.delivery_unit_id}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup>
                    </p>
                    <p>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Receive date</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name" name="name" defaultValue={this.state.data.expected_receving_date}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </Col>
                      </FormGroup></p>
                    <p>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Receiver phone</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" defaultValue={this.state.data.receiver_phone}
                               onChange={(event) => this.handleChangeData(event)}/>
                      </Col>
                    </FormGroup></p>
                    <p>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Address</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" defaultValue={this.state.data.receiving_address}
                               onChange={(event) => this.handleChangeData(event)}/>
                      </Col>
                    </FormGroup></p>
                    <p>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Cost</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" defaultValue={this.state.data.total_cost}
                               onChange={(event) => this.handleChangeData(event)}/>
                      </Col>
                    </FormGroup></p>
                  </Col>

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
              <p className="font-weight-bold">CHI TIẾT GIAO HÀNG </p>
            </Col>
          </Row>
          {this.tabPane()}
          <div className="form-actions">
            {/*<Button type="submit" color="primary" className="mr-1">Hủy</Button>*/}
            {/*<Button type="submit" color="info" className="mr-1">Hoàn thành</Button>*/}

          </div>

        </div>
      );
    }
  }
}

export default DeliveryDetail;
