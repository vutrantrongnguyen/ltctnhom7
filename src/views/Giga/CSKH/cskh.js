import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import config from "../../Config/strings";

class cskh extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <a href={config.nhom8_url}> Go to Team 8 website !</a>
      </div>
    );
  }
}

export default cskh;
