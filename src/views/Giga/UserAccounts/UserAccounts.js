import React, {Component} from 'react';
import {
  // Badge,
  Button, Card,
  CardBody,
  // CardHeader,
  Col, Input,
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

class UserAccounts extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
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
    this.getUserByPage();
    console.log("aaaaaa");
  }

  getUserByPage() {
    // let token = localStorage.getItem('token');
    let url ="https://secure-mountain-93147.herokuapp.com/api/users";
    fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({data: responseJson, isLoaded: true});
    }, function (error) {
    })
  }

  deleteUser(id, index) {
    // let token = localStorage.getItem('token');
    let url ="https://secure-mountain-93147.herokuapp.com/api/user/";
    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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

  renderAlert(investorId, index) {
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
        onConfirm={() => this.deleteUser(investorId, index)}
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

  renderAccount() {
    if (!this.state.isLoaded) {
      console.log(this.state.isLoaded);
      return <Spinner/>
    } else {
    let filtering = (this.state.filterField.name || this.state.filterField.mobile_phone || this.state.filterField.email);
    let data;
    if (!filtering) {
      data = this.state.data;
    } else {

      data = this.state.data.filter(x => this.filteredUser(x));
console.log(data);
    }
    let content = data.map((data, index) =>
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.phone}</td>
        <td>{data.email}</td>
        <td>{data.username}</td>
        <td>
          <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/account/detail/' + data.id)}><i
            className="fa fa-eye "/></Button>
          {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}><i
            className="cui-trash icons font-lg "/></Button>
        </td>
      </tr>);
    return content;
  }}

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      console.log(this.state.data);
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">TÀI KHOẢN NGƯỜI DÙNG</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink>

                    <TabPane tabId="2">
                      <Card>
                        <CardBody>
                          <Table responsive>
                            <thead>
                            <tr>
                              <th style={styles.topVertical}>ID</th>
                              <th>Họ tên<Input bsSize="sm" type="text" id="name" name="name"
                                               className="input-sm" placeholder="Tìm kiếm"
                                               onChange={(event) => this.handleChange(event)}/></th>
                              <th>Số ĐT<Input bsSize="sm" type="text" id="phone" name="phone"
                                              className="input-sm" placeholder="Tìm kiếm"
                                              onChange={(event) => this.handleChange(event)}/></th>
                              <th>Email<Input bsSize="sm" type="text" id="email" name="email"
                                              className="input-sm" placeholder="Tìm kiếm"
                                              onChange={(event) => this.handleChange(event)}/></th>
                              <th style={styles.topVertical}>Username</th>
                              <th style={styles.topVertical}>Nút lệnh</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderAccount()}
                            </tbody>
                          </Table>

                        </CardBody>
                      </Card>
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

export default UserAccounts;
