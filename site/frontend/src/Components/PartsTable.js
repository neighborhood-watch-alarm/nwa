import React from 'react';
import {Table} from 'reactstrap';

const PartsTable = props => {
  if(props.partsList.length > 0){
    return (
        <div>
        <h2>Parts list</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Component</th>
              <th>Suggested retailer</th>
            </tr>
          </thead>
          <tbody>
            {props.partsList.map((part) =>
                    <tr>
                        <td>{part["amount"]}</td>
                        <td>{part["model"]}</td>
                        <td><a href={part["link"]} target="_blank" rel="noopener noreferrer">{part["link"]}</a></td>
                    </tr>
            )}
          </tbody>
        </Table>
      </div>
      );
  }  
  return(<div/>);
};

export default PartsTable;
        