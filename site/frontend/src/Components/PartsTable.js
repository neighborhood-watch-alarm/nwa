import React, { Component } from 'react';
import {Table} from 'reactstrap';

const PartsTable = props => {
  
  return (
    <div>
    <h2>Parts list</h2>
    <Table bordered striped>
      <thead>
        <tr>
          <th>Sensor type</th>
          <th>Model</th>
          <th>Range</th>
          <th>Detection angle</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LIDAR</td>
          <td>LIDAR-Lite v3</td>
          <td>1-40m</td>
          <td>Singular</td>
          <td>$$$</td>
        </tr>
        <tr>
          <td>PIR</td>
          <td>HC-SR505</td>
          <td>0-3m</td>
          <td>Cone angle, less than 100 degrees</td>
          <td>$</td>
        </tr>
        <tr>
          <td>Ultrasonic</td>
          <td>LV-MaxSonar-EZ0</td>
          <td>0.15-6.45m</td>
          <td>62 degrees</td>
          <td>$$</td>
        </tr>
      </tbody>
    </Table>
  </div>
  );
};

export default PartsTable;
        