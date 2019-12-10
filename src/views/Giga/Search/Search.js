import React, {Component} from 'react';
import {
  // Badge,
  Button, Card,
  CardBody, CardHeader,
  // CardHeader,
  Col, FormGroup, Input, Label,
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
// import styles from "../../Config/styles";

class Products extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      isCategoriesLoaded: false,
      isBrandsLoaded: false,
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
    this.getSearch();

  }

  getSearch() {
    let url = "https://nhom7qtch.herokuapp.com/api/search/1";
    fetch(url, {
      method: "GET",
    }
    ).then(response => response.json()).then((responseJson) => {
      console.log("aaaaaaaaaaa",responseJson,this.state.isLoaded);
      this.setState({data: responseJson, isLoaded: true});
    }, function (error) {
    })
  }

  deleteProduct(id, index) {
    // let token = localStorage.getItem('token');
    let url = config.api_url + "/products/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
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
  updateSearch() {
    let requestData = {search: this.state.data};
    console.log(requestData);
    let url = 'https://nhom7qtch.herokuapp.com/api/search/1';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then((res) => res.json())
      .then((res) => {
        const getAlert = () => (
          <SweetAlert
            success
            timeout={1500}
            // title="Wieeeee!"
            onConfirm={() => this.props.history.goBack()}
          >
            Bạn đã cập nhật thông tin công ty môi giới thành công !
          </SweetAlert>
        );

        this.setState({
          alert: getAlert()
        });
        console.log(res);
      })
      .catch((err) => console.log(err))
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
        onConfirm={() => this.deleteProduct(Id, index)}
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
  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      data:
        {
          ...this.state.data,
          [input.name]: input.value
        }
    });
  };
  renderProducts() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.data;
      console.log(this.state.data);
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.brand}</td>
          <td>{data.price}</td>
          <td>{data.description}</td>
          <td><img src={data.image} alt="" height="100"/></td>
          <td>{data.category}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/product/' + data.id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
}

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {

console.log(this.state.data);
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">QUẢN LÝ TÌM KIẾM</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
                <Card>
                  <CardHeader>
                    <strong>Search</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="name">Item</Label>
                          <Input type="tag" id="item_per_page" name="item_per_page" autoComplete="tag" defaultValue={this.state.data.item_per_page}
                                 onChange={(event) => this.handleChangeData(event)}/>
                        </FormGroup>
                        <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                                onClick={() => this.updateSearch()}>Cập nhật</Button>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Products;
