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
  FormGroup, Label
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
    // let token = localStorage.getItem('token');
    let url = "https://online-selling-website.herokuapp.com/delivery/";
    fetch(url + accountId, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data);
      this.setState({data: responseJson, isLoaded: true, origin: JSON.parse(JSON.stringify(responseJson))});
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

  uploadImage() {
    let token = localStorage.getItem('token');
    // let avatarPath = document.getElementById('avatar-path').value;
    let preview = document.querySelector('#logo');
    let file = document.querySelector('#avatar-path').files[0]; //sames as here
    if (file) {
      let formData = new FormData();
      formData.append("file[new_image_path][]", file);
      fetch('http://159.65.136.144:4001/api/v1/files', {
        method: 'POST',
        body: formData,
        headers: {
          "authorization": "Bearer " + token,
        }
      }).then(response => response.json()).then((responseJson) => {
        let imagePath = responseJson.data.files[0].relativeUrl;
        preview.src = imagePath;
        this.setState({logo: imagePath});

      }, function (error) {
        console.log(error);
      });
    }
  }
  handleBuildingsDataChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    let data = this.state.data;
    data[name] = value;
    console.log(value);
    this.setState({data: data});

  }
  isEditing() {
    let data = this.state.data;
    if (!this.state.isEditing) {
      return (
        <Row>
          <Col sm="12" xl="12">
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
                      <Col sm="12" xl="12">
                        <div>
                          <h3>{data.order_id}</h3>
                        </div>
                      </Col>
                      {/*<Col sm="12" xl="4">*/}
                      {/*  <div>*/}
                      {/*    <p>Số CMTND: </p>*/}
                      {/*  </div>*/}
                      {/*</Col>*/}
                      {/*<Col sm="12" xl="4">*/}
                      {/*  <div>*/}
                      {/*    <p>Số điện thoại : {data.mobile_phone}</p>*/}
                      {/*  </div>*/}
                      {/*</Col>*/}
                      {/*<Col sm="12" xl="4">*/}
                      {/*  <div>*/}
                      {/*    <p>Email : {data.email}</p>*/}
                      {/*  </div>*/}
                      {/*</Col>*/}
                    </Row>
                  </Row>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <Row>
                    <Col xs="12" md="12">
                      <p>Delivery unit id: {data.delivery_unit_id} </p>
                      <p>Receive date: {data.expected_receving_date}</p>
                      <p>Receiver phone: {data.receiver_phone}</p>
                      <p>Address: {data.receiving_address}</p>
                      <p>Cost: {data.total_cost}</p>
                    </Col>
                    {/*<Col xs="12" md="4">*/}
                    {/*  <p>Số căn hộ sở hữu: </p>*/}
                    {/*  <p>Địa chỉ: {data.address}</p>*/}
                    {/*</Col>*/}
                    {/*<Col xs="12" md="4">*/}
                    {/*  <p>Số lần bị report: </p>*/}
                    {/*</Col>*/}
                  </Row>
                </div>
              </CardBody>
              <CardFooter>
                <div className="align-items-center">
                  {/*<FormGroup check inline className="align-self-center">*/}
                  {/*  <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1"*/}
                  {/*         value="option1"/>*/}
                  {/*  <Label className="form-check-label" check htmlFor="inline-checkbox1">Xóa</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check inline className="align-content-center">*/}
                  {/*  <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2"*/}
                  {/*         value="option2"/>*/}
                  {/*  <Label className="form-check-label" check htmlFor="inline-checkbox2">Khóa</Label>*/}
                  {/*</FormGroup>*/}
                </div>
                {/*<Button className="btn btn-info mr-1"*/}
                {/*        onClick={() => this.showEditingForm()}>Sửa</Button>*/}
                {/*<Button className="btn btn-danger mr-1"*/}
                {/*        onClick={() => this.deleteBuilding(building.id)}>Xóa</Button>*/}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      )
    } else {
      return (<Row>
        <Col sm="12" xl="12">
          <Card>
            <CardHeader>
              <div>
                <Row>
                  <Col sm="4" xl="4">
                    <div style={{height: 120, width: 120, background: 'whitesmoke', float: 'left'}}>
                      {/*<Input style={{display: 'none'}} type="file" id="avatar-path" name="avatar-path"*/}
                      {/*       onChange={() => this.uploadImage()}/>*/}
                      {/*<img onClick={() => AccountDetail.triggerUploadImage()} id="logo" height="120"*/}
                      {/*     src={data && data.avatar || "/assets/img/logo-placeholder.png"} alt="Logo preview..."/>*/}
                    </div>
                  </Col>
                  <Col sm="4" xl="4">
                    <div>
                      <h3>{data.name}</h3>
                    </div>
                  </Col>
                  <Col sm="4" xl="4">
                    <div>
                      <p>Số điện thoại :<Input id="phone" defaultValue={data.phone}  onChange={(event) => this.handleBuildingsDataChange(event)}/></p>

                      <p>Email : {data.email}</p>

                    </div>
                  </Col>
                </Row>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Row>
                  <Col xs="12" md="4">
                    <p>Username: </p>
                  </Col>
                  <Col xs="12" md="4">
                  </Col>
                  <Col xs="12" md="4">
                  </Col>
                </Row>
              </div>
            </CardBody>
            <CardFooter>
              {/*<FormGroup check inline className="align-self-center">*/}
              {/*  <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1"*/}
              {/*         value="option1"/>*/}
              {/*  <Label className="form-check-label" check htmlFor="inline-checkbox1">Xóa</Label>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup check inline className="align-content-center">*/}
              {/*  <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2"*/}
              {/*         value="option2"/>*/}
              {/*  <Label className="form-check-label" check htmlFor="inline-checkbox2">Khóa</Label>*/}
              {/*</FormGroup>*/}
              {/*<Button className="btn btn-info mr-1"*/}
              {/*        onClick={() => this.updateAccountInfo(data.id)}>Lưu</Button>*/}
              {/*<Button className="btn btn-default mr-1"*/}
              {/*        onClick={() => this.closeEditingForm()}>Hủy</Button>*/}
            </CardFooter>
          </Card>
        </Col>
      </Row>)
    }
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
          {this.isEditing()}
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
