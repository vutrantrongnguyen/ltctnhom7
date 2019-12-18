import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  // Badge,
  Button, Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  Col, Container, //Form,
  FormGroup,
  // FormText,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  //InputGroup,
  TabContent,
  // Table,
  TabPane
} from 'reactstrap';
import config from "../../Config/assets";
import Spinner from "reactstrap/es/Spinner";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles


import $ from 'jquery';
// import assets from "../../Config/assets";

window.jQuery = $;
require('bootstrap');

class AddInvestor extends Component {

  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      investor: {
        description: "",
        type: "",
        email: "",
        numberPhone: "",
        address: "",
        name: "",
        tag: "",
        website: "",
        city_id: "",
        ward_id: "",
        district_id: "",
      },
      alert: null,
      avatarPath: "",
      isCitiesLoaded: false,
      isDistrictsLoaded: false,
      isWardsLoaded: false,
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  AddInvestor() {

    let type = 'investor';
    let avatarPath = this.state.logo;
    let data = this.state.investor;
    let url = config.api_url + '/companies';
    let token = localStorage.getItem('token');
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      }),
      body: JSON.stringify({
        "company": {
          "email": data.email,
          "description": data.description,
          "type": type,
          "avatar_path": avatarPath,
          "number_phone": data.numberPhone,
          "address": data.address,
          "name": data.name,
          "tag": data.tag,
          "website": data.website,
          "city_id": data.city_id,
          "ward_id": data.ward_id,
          "district_id": data.district_id,
        }
      })
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => this.props.history.push('/admin/investors')}
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
              // success
              timeout={1500}
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

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }

  triggerUploadImage() {
    document.getElementById("avatar-path").click();
  }

  // uploadImage() {
  //   let token = localStorage.getItem('token');
  //   let preview = document.querySelector('#logo');
  //   let file = document.querySelector('#avatar-path').files[0];//sames as here
  //   if (file.size > assets.maxSize) {
  //     const getAlert = () => (
  //       <SweetAlert
  //         timeout={1500}
  //         confirmBtnBsStyle="danger"
  //         onConfirm={() => this.hideAlert()}
  //       >
  //         Kích thước ảnh quá lớn ! Dung lượng tối đa cho ảnh là 10MB.
  //       </SweetAlert>
  //     );
  //
  //     this.setState({
  //       alert: getAlert()
  //     });
  //   } else {
  //     let url = config.api_url + "/files";
  //     if (file) {
  //       let formData = new FormData();
  //       formData.append("file[new_image_path][]", file);
  //       fetch(url, {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           "authorization": "Bearer " + token,
  //         }
  //       }).then(response => response.json()).then((responseJson) => {
  //         let imagePath = responseJson.data.files[0].relativeUrl;
  //         preview.src = imagePath;
  //         this.setState({logo: imagePath});
  //
  //       }, function (error) {
  //         console.log(error);
  //       });
  //     }
  //   }
  // }

  onChange(content) {
    console.log(content);
    this.setState({
      investor: {
        ...this.state.investor,
        description: content
      }
    });
  }

  componentDidMount() {
    this.getCurrentAccountInfo();
  }


  getCurrentAccountInfo() {
    let token = localStorage.getItem('token');
    let url = config.api_url + "/current_user/";
    let citiesUrl = config.api_url + "/cities";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      console.log(responseJson.user);
      this.setState({user: responseJson.user, isLoaded: true});
    }, function (error) {
    });
    fetch(citiesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({all_cities: responseJson.data, isCitiesLoaded: true});
        // console.logresponseJson.data);
      }, function (error) {
      });
  }

  onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);

  };

  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  checkoutModal() {
    let data = this.state.data;
    var res = this.state.description ? this.state.description : null;
    res = res.replace(/<img/g, '<img style="max-width: 700px !important"');

    return (
      <Modal isOpen={this.state.showModal} toggle={this.toggleLarge}
             className={'modal-lg ' + this.props.className}>
        <ModalHeader toggle={this.toggleLarge}>Xem trước giới thiệu về công ty</ModalHeader>
        <ModalBody>
          <Container>

            <Row className="show-grid">
              <Col xs={6} md={4}>
                <img id="logo" width="200" src={this.state.logo ? this.state.logo : "/assets/img/logo-placeholder.png"}
                     alt="Logo preview..."/>
              </Col>
              <Col xs={6} md={8}>
                <p><h3>{document.getElementById('name') ? document.getElementById('name').value : null}</h3></p>
                <p><i
                  className="icon-map icons mt-4"/>{document.getElementById('address') ? document.getElementById('address').value : null}
                </p>
                <p><i
                  className="icon-location-pin icons  mt-4"/>{document.getElementById('numberPhone') ? document.getElementById('numberPhone').value : null}
                </p>
                <p><i
                  className="icon-envelope icons mt-4"/>{document.getElementById('email') ? document.getElementById('email').value : null}
                </p>
                <p><i
                  className="icon-screen-desktop icons mt-4"/>{document.getElementById('website') ? document.getElementById('website').value : null}
                </p>
              </Col>
            </Row>
            <hr/>
            <div>
              <p>GIỚI THIỆU</p>
              <div dangerouslySetInnerHTML={{__html: res}}/>

            </div>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleLarge}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }


  onCitySelectorChange() {
    let selector = document.getElementById('city_id').value;
    // console.logselector.value);
    this.setState({
      // all_districts: responseJson.data, isDistrictsLoaded: true,
      investor: {
        ...this.state.investor,
        city_id: selector,
      }
    });
    this.getDistrictList(selector);
    // let token = localStorage.getItem('token');
    // let selectedCityUrl = config.api_url + "/districts?city_id=" + selector.value;
    // fetch(selectedCityUrl, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "authorization": "Bearer " + token,
    //   },
    //   credentials: "same-origin"
    // })
    //   .then(response => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       all_districts: responseJson.data, isDistrictsLoaded: true,
    //       investor: {
    //         ...this.state.investor,
    //         city_id: selector.id,
    //       }
    //     });
    //     this.getDistrictList(selector.id);
    //   }, function (error) {
    //   });
  }

  onDistrictSelectorChange() {
    let districtId = document.getElementById('district_id').value;
    this.setState({
      isEditing: true,
      investor: {
        ...this.state.investor,
        district_id: districtId,
      }
    });

    this.getWardList(districtId);
  }

  getWardList(districtId) {
    let token = localStorage.getItem('token');
    let selectedDistrictUrl = config.api_url + "/wards?district_id=" + districtId;
    fetch(selectedDistrictUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({all_wards: responseJson.data, isWardsLoaded: true});
      }, function (error) {
      });
  }

  getDistrictList(cityId) {
    let token = localStorage.getItem('token');
    let selectedCityUrl = config.api_url + "/districts?city_id=" + cityId;
    fetch(selectedCityUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({all_districts: responseJson.data, isDistrictsLoaded: true});
      }, function (error) {
      });
  }

  onWardSelectorChange() {
    let selector = document.getElementById('ward_id');
    this.setState({
      investor: {
        ...this.state.investor,
        ward_id: selector.value,
      }
    });

  }

  renderCitiesList() {
    // console.logthis.state.all_cities);
    const cities = this.state.all_cities.map((data) => {
        return <option value={data.id} key={data.id}>{data.name}</option>
      }
    );
    if (this.state.isCitiesLoaded) {
      return cities
    } else {
      return null
    }
  }

  renderDistrictsList(selected) {
    if (this.state.isDistrictsLoaded) {
      const districts = this.state.all_districts.map((data) => {
          if (data.id === selected) {
            return <option selected value={data.id} key={data.id}>{data.name}</option>
          } else {
            return <option value={data.id} key={data.id}>{data.name}</option>
          }
        }
      );
      if (this.state.isDistrictsLoaded) {
        return districts
      } else {
        return null
      }
    } else {
      return null
    }
  }

  renderWardsList(selected) {
    if (this.state.isWardsLoaded) {
      // console.logthis.state.all_wards);
      const wards = this.state.all_wards.map((data) => {
          if (data.id === selected) {
            return <option selected value={data.id} key={data.id}>{data.name}</option>
          } else {
            return <option value={data.id} key={data.id}>{data.name}</option>
          }
        }
      );
      if (this.state.isWardsLoaded) {
        return wards
      } else {
        return null
      }
    } else {
      return null
    }
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

  handleInputDispatch = (event) => {
    const target = event.target;
    let name = target.name;
    let value = null;

    if (name.includes("[]")) {
      value = [target.value];
      name = name.replace('[]', '');
    } else {
      value = target.value;
    }


    this.setState({
      investor: {
        ...this.state.investor,
        [name]: value
      }
    }, () => {
    })

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
                    <Label htmlFor="file-input">Logo công ty ( Click để chọn ảnh )</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input style={{display: 'none'}} type="file" id="avatar-path" name="avatar-path"
                           onChange={() => this.uploadImage()}/>
                    <img onClick={() => this.triggerUploadImage()} id="logo" height="200"
                         src="/assets/img/logo-placeholder.png" alt="Logo preview..."/>

                    {/*<div>*/}
                    {/*    <p>Click to change your logo, your logo should be 300 x 300 and less than 1MB</p>*/}
                    {/*    <input id="logo-input" style="display: none" type="file" onChange="previewFile()"><br>*/}
                    {/*</div>*/}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Tên công ty ( Tên thương hiệu )</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" required onChange={(event) => this.handleChangeData(event)}
                      // defaultValue={userInfo.name}
                    />
                    {/*<FormText color="muted">This is a help text</FormText>*/}
                  </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    /!*<Label htmlFor="type-input">Phân loại thương hiệu</Label>*!/*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    /!*<FormText color="muted">This is a help text</FormText>*!/*/}
                {/*<Input type="hidden" id="type" name="type" />*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Địa chỉ</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="address" id="address" required name="address" autoComplete="address"
                           onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter your email</FormText>*/}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Khu vực</Label>
                  </Col>
                  <Col md="3">
                    <Input type="select" name="city_id" id="city_id" required
                           onChange={() => this.onCitySelectorChange()}>
                      <option value="0">Thành phố</option>
                      {this.renderCitiesList()}
                    </Input>
                  </Col>
                  <Col md="3">
                    <Input type="select" name="district_id" id="district_id" required
                           onChange={() => this.onDistrictSelectorChange()} onBlur={this.handleInputDispatch}
                    >
                      <option value="0">Quận,Huyện</option>
                      {this.renderDistrictsList()}
                    </Input>
                  </Col>
                  <Col md="3">
                    <Input type="select" name="ward_id" id="ward_id" required
                           onChange={() => this.onWardSelectorChange()}
                           onBlur={this.handleInputDispatch}
                    >
                      <option value="0">Phường</option>
                      {this.renderWardsList()}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Số điện thoại</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="numberPhone" id="numberPhone" required name="numberPhone" autoComplete="numberPhone"
                           onChange={(event) => this.handleChangeData(event)}
                      // defaultValue={userInfo.mobile_phone}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Website</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="website" id="website" name="website" required autoComplete="website"
                           onChange={(event) => this.handleChangeData(event)}
                      // defaultValue={userInfo.mobile_phone}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Email</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="email" id="email" name="email" required autoComplete="email"
                           onChange={(event) => this.handleChangeData(event)}
                      // defaultValue={userInfo.email}
                    />
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="password-input">Tag</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="tag" id="tag" name="tag" required autoComplete="tag"
                           onChange={(event) => this.handleChangeData(event)}/>
                    {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                  </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label>Có nhân viên môi giới</Label>*/}
                {/*  </Col>*/}
                {/*  <Col md="9">*/}
                {/*    <FormGroup check inline>*/}
                {/*      <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1"*/}
                {/*             value="option1"/>*/}
                {/*      <Label className="form-check-label" check htmlFor="inline-checkbox1">Có</Label>*/}
                {/*    </FormGroup>*/}
                {/*    <FormGroup check inline>*/}
                {/*      <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2"*/}
                {/*             value="option2"/>*/}
                {/*      <Label className="form-check-label" check htmlFor="inline-checkbox2">Không</Label>*/}
                {/*    </FormGroup>*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Giới thiệu về công ty</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {/*<Input type="textarea" name="description" id="description" rows="9"/>*/}
                    <ReactSummernote
                      name="description" id="description"
                      value={this.state.description}
                      options={{
                        lang: 'ru-RU',
                        height: 150,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link', 'picture', 'video']],
                          // ['view', ['fullscreen', 'codeview']]
                        ]
                      }}
                      onChange={(content) => this.onChange(content)}
                      onImageUpload={this.onImageUpload}

                    />
                  </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                {/*  <Col md="3">*/}
                {/*    <Label htmlFor="password-input">Tối ưu từ khóa</Label>*/}
                {/*  </Col>*/}
                {/*  <Col xs="12" md="9">*/}
                {/*    <Input type="password" id="password-input" name="password-input" autoComplete="new-password"/>*/}
                {/*    /!*<FormText className="help-block">Please enter a complex password</FormText>*!/*/}
                {/*  </Col>*/}
                {/*</FormGroup>*/}
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit" onClick={() => {
                    this.props.history.push("/admin/investors");
                  }}>Hủy</Button>
                  <Button onClick={() => this.toggleLarge()} className="mr-1" type="submit" color="info">Xem
                    trước</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                          onClick={() => this.AddInvestor()}>Hoàn thành</Button>
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
    if (!this.state.isLoaded || !this.state.isCitiesLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">THÊM CHỦ ĐẦU TƯ</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              {/*<Nav tabs>*/}
              {/*  <NavItem>*/}
              {/*    <NavLink*/}
              {/*      active={this.state.activeTab[0] === '1'}*/}
              {/*      onClick={() => {*/}
              {/*        this.toggle(0, '1');*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      (1)Thông tin chung của dự án*/}
              {/*    </NavLink>*/}
              {/*  </NavItem>*/}


              {/*</Nav>*/}
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
                {this.state.alert}
                {this.checkoutModal()}
              </TabContent>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default AddInvestor;
