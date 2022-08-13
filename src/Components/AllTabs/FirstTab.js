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
  14: "AL1",
  15: "AL2",
  16: "AL3",
  17: "AL4",
  18: "AL5",
  19: "ML1",
  20: "ML2",
  21: "ML3",
  22: "ML4",
  23: "ML5",
};
var slots = {};
for (var i = 0; i < 24; i++) {
  slots[slotMap[i]] = "";
}
var t_o = {};
var passToDB = 0;
var selectedSlotIndex = 0;
const FirstTab = () => {
  var targetProxy = new Proxy(t_o, {
    set: function (target, key, value) {
      console.log(`${key} set to ${value}`);
      target[key] = value;
      return true;
    },
  });
  targetProxy.passToDB = passToDB;
  function addSlot() {
    var selectedSlotName = document.getElementById("Alias").value;
    slots[slotMap[selectedSlotIndex]] = selectedSlotName;
    var selectedSlot = document.getElementById(slotMap[selectedSlotIndex]);
    selectedSlot.setAttribute("disabled", "1");
    console.log(slots);
    console.log(passToDB);
    localStorage.setItem(slotMap[selectedSlotIndex], selectedSlotName);
    localStorage.setItem("someNumber", 23);
    localStorage.setItem("someNumber2", 232);
    console.log(
      localStorage.getItem("someNumber") + localStorage.getItem("someNumber2")
    );
  }
  const clearAll = () => {
    var temp = document.getElementsByTagName("option");
    for (var i = 0; i < 24; i++) {
      if (temp[i] != undefined && temp[i].disabled) {
        temp[i].removeAttribute("disabled");
      }
      localStorage.removeItem(slotMap[i]);
      slots[slotMap[i]] = "";
    }
    console.log(slots);
  };
  return (
    <div className="FirstTab">
      <div className="input">
        <input
          id="Alias"
          autoComplete="off"
          type="text"
          placeholder="Slot Name"
          required
        ></input>
        <br></br>
        <br></br>
        <select
          id="menu"
          onChange={(event) => {
            passToDB = event.target.options.selectedIndex;
            selectedSlotIndex = event.target.options.selectedIndex;
            targetProxy.passToDB = passToDB;
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
          <option id="AL1" className="slotOption" value="AL1">
            AL1
          </option>
          <option id="AL2" className="slotOption" value="AL2">
            AL2
          </option>
          <option id="AL3" className="slotOption" value="AL3">
            AL3
          </option>
          <option id="AL4" className="slotOption" value="AL4">
            AL4
          </option>
          <option id="AL5" className="slotOption" value="AL5">
            AL5
          </option>
          <option id="ML1" className="slotOption" value="ML1">
            ML1
          </option>
          <option id="ML2" className="slotOption" value="ML2">
            ML2
          </option>
          <option id="ML3" className="slotOption" value="ML3">
            ML3
          </option>
          <option id="ML4" className="slotOption" value="ML4">
            ML4
          </option>
          <option id="ML5" className="slotOption" value="ML5">
            ML5
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
