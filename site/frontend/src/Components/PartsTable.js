import React from 'react';
import {Table} from 'reactstrap';
import { useTranslation } from "react-i18next";


const PartsTable = props => {
  const { t } = useTranslation("alarm_v1");

  if(props.partsList.length > 0){
    return (
        <div>
        <h2>{t("design.parts-table.title")}</h2>
        <Table striped>
          <thead>
            <tr>
              <th>{t("design.parts-table.amount")}</th>
              <th>{t("design.parts-table.component")}</th>
              <th>{t("design.parts-table.retailer")}</th>
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
        