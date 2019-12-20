import React, {Component} from 'react';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardHeader,
  Col, Input,
  // Input,
  Nav,
  NavItem,
  NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  // TabContent,
  Table,
  TabPane
} from 'reactstrap';
import Spinner from "reactstrap/es/Spinner";
import config from "../../Config/strings";
import SweetAlert from 'react-bootstrap-sweetalert';
import styles from "../../Config/styles";

class Banners extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      isCouponLoaded: false,
      // isUnitLoaded: false,
      data: [],
      alert: null,
      filterField: {
        name: "",
        mobile_phone: "",
        email: "",
      }
    };
  }

  componentDidMount() {
    this.getBanners();
    this.getCoupons();
  }

  getBanners() {
    // let token = localStorage.getItem('token');
    let url =config.nhom5_url + "/api/banners";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({banners: responseJson, isLoaded: true});
      console.log(responseJson.data);
    }, function (error) {
    })
  }

  getCoupons() {
    // let token = localStorage.getItem('token');
    let url = config.nhom5_url + "/api/coupons";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({coupons: responseJson.data, isCouponLoaded: true});
      console.log(responseJson.data);

    }, function (error) {
    })
  }


  deleteBanner(id, index) {
    // let token = localStorage.getItem('token');
    let url = config.nhom5_url + "/api/banners/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      credentials: "same-origin"
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => {
                this.hideAlert();
                this.state.data.splice(index, 1)
              }}
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
  deleteCoupon(id, index) {
    // let token = localStorage.getItem('token');
    let url = config.nhom5_url + "/api/coupons/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      credentials: "same-origin"
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => {
                this.hideAlert();
                this.state.data.splice(index, 1)
              }}
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

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  // handleChange(event) {
  //   this.state.filterField[event.target.name] = event.target.value;
  //   this.setState(({filterField: this.state.filterField}));
  // }
  //
  // filteredUser(user) {
  //   let fields = this.state.filterField;
  //   return ((user.name && user.name.toLowerCase().indexOf(fields.name.toLowerCase())) !== -1) &&
  //     ((user.mobile_phone && user.mobile_phone.toLowerCase().indexOf(fields.mobile_phone.toLowerCase())) !== -1) &&
  //     ((user.email && user.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1);
  // }

  renderAlert(Id, index) {
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        // customIcon="thumbs-up.jpg"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={() => this.deleteBanner(Id, index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>);
    // this.state.data.splice(index, 1);
    this.setState({
      alert: getAlert()
    });
  }
  renderCouponAlert(Id, index) {
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        // customIcon="thumbs-up.jpg"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={() => this.deleteCoupon(Id, index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>);
    // this.state.data.splice(index, 1);
    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  renderBanners() {
    if (!this.state.isLoaded || !this.state.isCouponLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.banners;
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td><img src={data.image_name} width="300"   alt=""/></td>
          <td>{data.title}</td>
          <td>{data.status}</td>
          <td>{data.link}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/banner/detail/' + data.id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  renderCoupon() {
    if (!this.state.isLoaded || !this.state.isCouponLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.coupons;
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.coupon_code}</td>
          <td>{data.amount}</td>
          <td>{data.amount_type}</td>
          <td>{data.expiry_date}</td>
          <td>{data.status}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/coupon/detail/' + data.id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderCouponAlert(data.id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }


  render() {
    if (!this.state.isLoaded || !this.state.isCouponLoaded) {
      return <Spinner/>
    } else {


      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">QUẢN LÝ QUẢNG CÁO - kHUYẾN MẠI</p>
              <div className="animated fadeIn">
                <Row>
                  <Col xs="12" md="12">
                  <a href={config.nhom5_url}> Go to Team 5 website !</a>
                    <p>Gửi yêu cầu điều chỉnh quảng cáo , khuyến mại : </p></Col>
                  <Col xs="6" md="6">
                    <Input type="username" id="username" name="username" autoComplete="username"
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                  <Col xs="12" md="6">


                    <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/coupon/add/')} style={{marginBottom:30}}>Gửi</Button>
                  </Col>

                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink>
                    <TabPane tabId="2">
                      <Row>
                        <Col xs="12" md="6">
                          <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/banner/add/')} style={{marginBottom:30}}><i
                            className="fa fa-eye "/>Tạo quảng cáo mới</Button>
                          <Card>
                          <CardBody>
                            <p>Banners</p>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th style={styles.topVertical}>ID</th>
                                <th>Image
                                  {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Title
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Link
                                  {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                {/*<th style={styles.topVertical}>Username</th>*/}
                                <th style={styles.topVertical}>Status</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderBanners()}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card></Col>
                        <Col xs="12" md="6">
                          <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/coupon/add/')} style={{marginBottom:30}}><i
                            className="fa fa-eye "/>Tạo khuyến mại mới</Button>
                          <Card>
                          <CardBody>
                            <p>Coupons</p>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th style={styles.topVertical}>Index</th>
                                <th>Code
                                  {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Amount
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Type</th>
                                <th>Expiry date</th>
                                <th>Status</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderCoupon()}
                              </tbody>
                            </Table>


                          </CardBody>
                        </Card></Col>
                      </Row>

                    </TabPane>
                  </NavLink>
                </NavItem>

              </Nav>
              {/*<TabContent activeTab={this.state.activeTab[1]}>*/}
              {/*  {this.tabPane()}*/}
              {/*</TabContent>*/}
              {this.state.alert}
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Banners;
