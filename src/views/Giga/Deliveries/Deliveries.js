import React, {Component} from 'react';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardHeader,
  Col,
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

class Deliveries extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      isShipperLoaded: false,
      isUnitLoaded: false,
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
    this.getOrders();
    this.getShippers();
    this.getDeliveryUnits()
  }

  getOrders() {
    // let token = localStorage.getItem('token');
    let url = "https://online-selling-website.herokuapp.com/deliveries";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({data: responseJson.deliveries, isLoaded: true});
    }, function (error) {
    })
  }

  getShippers() {
    // let token = localStorage.getItem('token');
    let url = "https://online-selling-website.herokuapp.com/shippers";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({shippers: responseJson.deliveries, isShipperLoaded: true});
    }, function (error) {
    })
  }

  getDeliveryUnits() {
    // let token = localStorage.getItem('token');
    let url = "https://online-selling-website.herokuapp.com/delivery_units";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({units: responseJson.delivery_units, isUnitLoaded: true});
    }, function (error) {
    })
  }

  deleteOrder(id, index) {
    let token = localStorage.getItem('token');
    let url = config.api_url + "/order/";
    fetch(url + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
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

  handleChange(event) {
    this.state.filterField[event.target.name] = event.target.value;
    this.setState(({filterField: this.state.filterField}));
  }

  filteredUser(user) {
    let fields = this.state.filterField;
    return ((user.name && user.name.toLowerCase().indexOf(fields.name.toLowerCase())) !== -1) &&
      ((user.mobile_phone && user.mobile_phone.toLowerCase().indexOf(fields.mobile_phone.toLowerCase())) !== -1) &&
      ((user.email && user.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1);
  }

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
        onConfirm={() => this.deleteOrder(Id, index)}
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

  renderOrder() {
    if (!this.state.isLoaded || !this.state.isShipperLoaded || !this.state.isUnitLoaded) {
      return <Spinner/>
    } else {
      // let filtering = (this.state.filterField.name || this.state.filterField.mobile_phone || this.state.filterField.email);
      // let data;
      // if (!filtering) {
      //   data = this.state.data;
      // } else {
      //
      //   data = this.state.data.filter(x => this.filteredUser(x));
      //
      // }
      let data = this.state.data;
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.receiver_phone}</td>
          <td>{data.receiving_address}</td>
          <td>{data.total_cost}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/delivery/' + data.order_id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.order_id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  renderShipper() {
    if (!this.state.isLoaded || !this.state.isShipperLoaded || !this.state.isUnitLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.shippers;
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.phone}</td>
          <td>
            {/*<Button className="mr-1 btn-info" onClick={() => this.props.history.push('/delivery/' + data.order_id)}><i*/}
            {/*  className="fa fa-eye "/></Button>*/}
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.order_id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  renderUnit() {
    if (!this.state.isLoaded || !this.state.isShipperLoaded || !this.state.isUnitLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.units;
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.base_fee}</td>
          <td>{data.delivery_time}</td>
          <td>
            {/*<Button className="mr-1 btn-info" onClick={() => this.props.history.push('/delivery/' + data.order_id)}><i*/}
            {/*  className="fa fa-eye "/></Button>*/}
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.order_id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  render() {
    if (!this.state.isLoaded || !this.state.isShipperLoaded || !this.state.isUnitLoaded) {
      return <Spinner/>
    } else {


      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">QUẢN LÝ GIAO HÀNG</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink>
                    <TabPane tabId="2">
                      <Row>
                        <Col xs="12" md="6"> <Card>
                          <CardBody>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th style={styles.topVertical}>ID</th>
                                <th>Phone
                                  {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Address
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Cost
                                  {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                {/*<th style={styles.topVertical}>Username</th>*/}
                                <th style={styles.topVertical}>Button</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderOrder()}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card></Col>
                        <Col xs="12" md="6"> <Card>
                          <CardBody>
                            <p>Shippers</p>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th style={styles.topVertical}>Index</th>
                                <th>Name
                                  {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Phone
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th style={styles.topVertical}>Button</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderShipper()}
                              </tbody>
                            </Table>
                            <hr/>
                            <p>Delivery Units</p>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th style={styles.topVertical}>Index</th>
                                <th>Name
                                  {/*<Input bsSize="sm" type="text" id="name" name="name"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Base Fee
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Delivery Time
                                  {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                {/*<th style={styles.topVertical}>Username</th>*/}
                                <th style={styles.topVertical}>Button</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderUnit()}
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

export default Deliveries;
