import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import config from "../../Config/strings";

class shops extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <a href={config.nhom1_url} > Go to Team 1 website !</a>
      </div>
    );
  }
}

export default shops;
