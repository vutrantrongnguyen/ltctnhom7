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
  FormGroup, Label, TabPane
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
    // let avatarPath = document.getElementById('avatarPath').value;
    // let mobilePhone = document.getElementById('mobilePhone').value;
    // let address = document.getElementById('address').value;
    // let givenName = document.getElementById('givenName').value;
    // let name = document.getElementById('name').value;
    // let avatarPath = this.state.data.avatarPath;
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
    let url =  "https://nguyenvd27-ltct-demo.herokuapp.com/api/products/";
    fetch(url + accountId, {
      method: "GET",
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data);
      this.setState({data: responseJson.data[0], isLoaded: true, origin: JSON.parse(JSON.stringify(responseJson.data))});
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


  static triggerUploadImage() {
    document.getElementById("avatar-path").click();
  }



  tabPane() {
    console.log(this.state.data);
    return (
      <>
        <TabPane tabId="1">
          <Card>

            <CardBody>
              <div id="AddInvestor">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" defaultValue={this.state.data.name}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Price</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="username" id="username" name="username" autoComplete="username"
                           defaultValue={this.state.data.price}
                           onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter your email</FormText>*/}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="phone" id="phone" name="phone" autoComplete="phone"
                           defaultValue={this.state.data.description}
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Category</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="type" id="type" required autoComplete="type" defaultValue={this.state.data.category} onChange={(event) => this.handleChangeData(event)}>
                      <option value="4">Please select</option>
                      <option value="0">Admin</option>
                      <option value="1">Staff</option>
                      <option value="2">User</option>

                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email">Brand</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" autoComplete="email"
                           defaultValue={this.state.data.brand} onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
 <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email">Sold out</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" autoComplete="email"
                           defaultValue={this.state.data.sold_out} onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
 <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email">Image</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" autoComplete="email"
                           defaultValue={this.state.data.image} onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit"
                          onClick={() => this.props.history.goBack()}>Hủy</Button>
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
              <p className="font-weight-bold">CHI TIẾT SẢN PHẨM </p>
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

export default AccountDetail;
