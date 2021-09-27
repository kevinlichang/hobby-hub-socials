import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

let DeleteButton = () => {
  return (
    <Button
      as="div"
      color="red"
      floated="right"
      onClick={() => console.log("delete clicked")}
    >
      <Icon name="remove" style={{ margin: 0 }} />
    </Button>
  )
}

export default DeleteButton;