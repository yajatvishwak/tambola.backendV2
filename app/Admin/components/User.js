import React, { useState } from "react";

import Rect from "./Rect";

const User = (props) => {
  const [selected, setSelected] = useState([]);

  const addToSelected = (item) => {
    setSelected([...selected, item]);
    props.updateMark([...selected, item]);
  };
  const remFromSelected = (item) => {
    var index = selected.indexOf(item);
    var t = selected;
    if (index > -1) {
      t.splice(index, 1);
    }
    setSelected(t);
    props.updateMark(t);
  };
  //console.log(props);\

  if (props.data.length === 0) {
    return null;
  } else {
    var names = props.data.map((element) => {
      return (
        <Rect add={addToSelected} rem={remFromSelected} element={element} />
      );
    });
    //console.log(name);
    return names;
  }
};

export default User;
