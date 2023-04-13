import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isFrozen ? "red" : "#59E391",
  };
  return (
    // <div
    //   className="box"
    //   id={props.frozenornot ? "frozen" : ""}
    //   onClick={props.handlefreeze}
    // >
    <div className="box" style={styles} onClick={props.freezeDice}>
      <h2>{props.value}</h2>
    </div>
  );
}
