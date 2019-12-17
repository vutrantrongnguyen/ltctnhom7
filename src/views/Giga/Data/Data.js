import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import config from "../../Config/strings";

class Data extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <a href={config.nhom6_url}> Go to Team 6 website !</a>
      </div>
    );
  }
}

export default Data;
