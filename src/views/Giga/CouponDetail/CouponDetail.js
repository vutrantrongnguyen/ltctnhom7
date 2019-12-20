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
  TabPane,
  FormGroup, Label
} from 'reactstrap';
// import CardFooter from "reactstrap/es/CardFooter";
import Spinner from "reactstrap/es/Spinner";
import config from "../../Config/strings";

class AccountDetail extends Component {

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
    let url =config.nhom5_url + '/api/coupons/';
    fetch(url + userId, {
      method: 'PUT',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state.data)
    }).then((res) => res.json())
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err))
  }

  getAccountDetailById(accountId) {
    let url =config.nhom5_url+ "/api/coupons/";
    fetch(url + accountId, {
      method: "GET",
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson);
      this.setState({data: responseJson.data, isLoaded: true, origin: JSON.parse(JSON.stringify(responseJson))});
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
                    <Label htmlFor="text-input">Code</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" defaultValue={this.state.data.coupon_code}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Amount</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="username" id="username" name="username" autoComplete="username"
                           defaultValue={this.state.data.amount}
                           onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter your email</FormText>*/}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Amount Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="phone" id="phone" name="phone" autoComplete="phone"
                           defaultValue={this.state.data.amount_type}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Expiry Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="type" id="type" required autoComplete="type" defaultValue={this.state.data.expiry_date} onChange={(event) => this.handleChangeData(event)}>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email">Status</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" autoComplete="email"
                           defaultValue={this.state.data.status} onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit"
                          onClick={() => this.props.history.goBack()}>Hủy</Button>
                  <Button onClick={() => this.toggleLarge()} className="mr-1" type="submit" color="info">Xem
                    trước</Button>
                  {/*<Button className="mr-1" type="submit" color="info">Xem trước</Button>*/}
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          onClick={() => this.updateAccountInfo(this.state.data.id)}>Cập nhật</Button>
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

    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      // let data = this.state.data;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">CHI TIẾT KHUYẾN MẠI </p>
            </Col>
          </Row>
          {this.tabPane()}
          {this.state.alert}
          <div className="form-actions">
            {/*<Button type="submit" color="primary" className="mr-1">Hủy</Button>*/}
            {/*<Button type="submit" color="info" className="mr-1">Hoàn thành</Button>*/}

          </div>

        </div>
      );
    }
  }
}

export default AccountDetail;
