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
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts() {
    // let token = localStorage.getItem('token');
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/products/";
    fetch(url, {
        method: "GET",
        // headers: {
        // "Content-Type": "application/json",
        // "authorization": "Bearer " + token,
        //   'Access-Control-Allow-Origin': "*",
        //   'Access-Control-Allow-Headers': "*",
        // },
        // credentials: "same-origin"
      }
    ).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.data, this.state.isLoaded);
      this.setState({data: responseJson.data, isLoaded: true});
    }, function (error) {
    })
  }

  getCategories() {
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/categories/";
    fetch(url, {
        method: "GET",
      }
    ).then(response => response.json()).then((responseJson) => {
      this.setState({categories: responseJson.data, isCategoriesLoaded: true});
    }, function (error) {
    })
  }

  getBrands() {
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/brands/";
    fetch(url, {
        method: "GET",
      }
    ).then(response => response.json()).then((responseJson) => {
      this.setState({brands: responseJson.data, isBrandsLoaded: true});
    }, function (error) {
    })
  }

  deleteProduct(id, index) {
    // let token = localStorage.getItem('token');
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/products/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
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

  deleteCategory(id, index) {
    // let token = localStorage.getItem('token');
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/categories/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
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

  deleteBrand(id, index) {
    // let token = localStorage.getItem('token');
    let url = "https://nguyenvd27-ltct-demo.herokuapp.com/api/brands/";
    fetch(url + id, {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      //   "authorization": "Bearer " + token,
      // },
      // credentials: "same-origin"
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

  renderCategoryAlert(Id, index) {
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
        onConfirm={() => this.deleteCategory(Id, index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>);
    // this.state.data.splice(index, 1);
    this.setState({
      alert: getAlert()
    });
  }

  renderBrandAlert(Id, index) {
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
        onConfirm={() => this.deleteBrand(Id, index)}
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

  renderProducts() {
    if (!this.state.isLoaded) {
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
      console.log(this.state.data);
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.brand}</td>
          <td>{data.price}</td>
          <td>{data.name}</td>
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

  renderCategories() {
    if (!this.state.isCategoriesLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.categories;
      console.log(data);
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/product/' + data.id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderCategoryAlert(data.id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  renderBrands() {
    if (!this.state.isBrandsLoaded) {
      return <Spinner/>
    } else {
      let data = this.state.brands;
      console.log(this.state.brands);
      let content = data.map((data, index) =>
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>
            <Button className="mr-1 btn-info" onClick={() => this.props.history.push('/product/' + data.id)}><i
              className="fa fa-eye "/></Button>
            {/*<Button className="mr-1 btn-success"><i className="cui-pencil icons font-lg "></i></Button>*/}
            <Button className="mr-1 btn-danger" onClick={() => this.renderBrandAlert(data.id, index)}><i
              className="cui-trash icons font-lg "/></Button>
          </td>
        </tr>);
      return content;
    }
  }

  render() {
    if (!this.state.isLoaded || !this.state.isCategoriesLoaded || !this.state.isBrandsLoaded) {
      return <Spinner/>
    } else {


      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">QUẢN LÝ SẢN PHẨM</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink>
                    <TabPane tabId="2">
                      <Row>
                        <Col xs="12" md="8"><Card>
                          <CardBody>
                            <Table responsive>
                              <thead>
                              <tr>
                                <th>ID</th>
                                <th>Brand
                                  {/*<Input bsSize="sm" type="text" id="brand" name="brand"*/}
                                  {/*               className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*               onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Price
                                  {/*<Input bsSize="sm" type="text" id="phone" name="phone"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>Description
                                  {/*<Input bsSize="sm" type="text" id="email" name="email"*/}
                                  {/*              className="input-sm" placeholder="Tìm kiếm"*/}
                                  {/*              onChange={(event) => this.handleChange(event)}/>*/}
                                </th>
                                <th>image</th>
                                <th>Categories</th>
                                <th>Button</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.renderProducts()}
                              </tbody>
                            </Table>

                          </CardBody>
                        </Card></Col>
                        <Col xs="12" md="4">
                          <Card>
                            <CardBody>
                              <p>Category</p>
                              <Table responsive>
                                <thead>
                                <tr>
                                  <th>Index</th>
                                  <th>Name
                                  </th>
                                  <th>Description
                                  </th>
                                  <th>Button</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderCategories()}
                                </tbody>
                              </Table>
                              <hr/>
                              <p>Brand</p>
                              <Table responsive>
                                <thead>
                                <tr>
                                  <th>Index</th>
                                  <th>Brand
                                  </th>
                                  <th>Description
                                  </th>
                                  <th>Button</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderBrands()}
                                </tbody>
                              </Table>
                            </CardBody>
                          </Card>
                        </Col>
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

export default Products;
