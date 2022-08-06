import React from "react";
import "./FirstTab.css";

var slotMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "A1",
  8: "B1",
  9: "C1",
  10: "D1",
  11: "E1",
  12: "F1",
  13: "G1",
};
var slots = {};
for (var i = 0; i < 14; i++) {
  slots[slotMap[i]] = "";
}
var slotsBinary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var selectedSlotIndex = 0;

const FirstTab = () => {
  function addSlot() {
    var selectedSlotName = document.getElementById("Alias").value;
    slots[slotMap[selectedSlotIndex]] = selectedSlotName;
    var selectedSlot = document.getElementById(slotMap[selectedSlotIndex]);
    selectedSlot.setAttribute("disabled", "1");
    console.log(slots);
    console.log(slotsBinary);
  }
  const clearAll = () => {
    var temp = document.getElementsByTagName("option");
    console.log(temp);
    for (var i = 0; i < 14; i++) {
      slotsBinary[i] = 0;
      if (temp[i] != undefined && temp[i].disabled) {
        temp[i].removeAttribute("disabled");
      }
      slots[slotMap[i]] = "";
    }
    console.log(slotsBinary);
  };
  return (
    <div className="FirstTab">
      <div className="input">
        <input id="Alias" type="text" placeholder="Slot Name" required></input>
        <br></br>
        <br></br>
        <select
          id="menu"
          onChange={(event) => {
            slotsBinary[event.target.options.selectedIndex] = 1;
            selectedSlotIndex = event.target.options.selectedIndex;
          }}
        >
          <option id="A" className="slotOption" value="A">
            A
          </option>
          <option id="B" className="slotOption" value="B">
            B
          </option>
          <option id="C" className="slotOption" value="C">
            C
          </option>
          <option id="D" className="slotOption" value="D">
            D
          </option>
          <option id="E" className="slotOption" value="E">
            E
          </option>
          <option id="F" className="slotOption" value="F">
            F
          </option>
          <option id="G" className="slotOption" value="G">
            G
          </option>
          <option id="A1" className="slotOption" value="A1">
            A1
          </option>
          <option id="B1" className="slotOption" value="B1">
            B1
          </option>
          <option id="C1" className="slotOption" value="C1">
            C1
          </option>
          <option id="D1" className="slotOption" value="D1">
            D1
          </option>
          <option id="E1" className="slotOption" value="E1">
            E1
          </option>
          <option id="F1" className="slotOption" value="F1">
            F1
          </option>
          <option id="G1" className="slotOption" value="G1">
            G1
          </option>
        </select>
        <br></br>
        <br></br>
        <button
          type="button"
          id="setSlot"
          defaultValue="false"
          onClick={addSlot}
        >
          Add Slot
        </button>
        <br></br>
        <br></br>
        <button
          type="button"
          id="clearAll"
          defaultValue="false"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};
export default FirstTab;
