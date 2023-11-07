import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';

export default (props) => {
  return (
    <Table width="100%" >
      <TBody>
        <TR>
          <TD
            style={props.textStyle}>
            {props.children}
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
