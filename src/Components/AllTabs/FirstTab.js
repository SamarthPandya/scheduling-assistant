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
    fetch("https://iitgtt2022.000webhostapp.com/fetch.php?sl=" + passToDB, {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "GET",
    })
      .then(function (response) {
        var x = response.json().then((data) => {
          var res = data;
          console.log(res);
          for (const it in res) {
            const curr = res[it];
            for (const slott in curr) {
              const temp = (it + slott).toLocaleLowerCase();
              console.log(temp);
              document.getElementById(temp).innerHTML = slots[res[it][slott]];
            }
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    localStorage.setItem(slotMap[selectedSlotIndex], selectedSlotName);
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
      <div>
        <table>
          <tr>
            <th>Day</th>
            <th>7:55-8:50</th>
            <th>9:00-9:55</th>
            <th>10:00-10:55</th>
            <th>11:00-11:55</th>
            <th>12:00-12:55</th>
            <th>2:00-2:55</th>
            <th>3:00-3:55</th>
            <th>4:00-4:55</th>
            <th>5:00-5:55</th>
          </tr>
          <tr>
            <td id="mon">Monday</td>
            <td id="monslot1"></td>
            <td id="monslot2"></td>
            <td id="monslot3"></td>
            <td id="monslot4"></td>
            <td id="monslot5"></td>
            <td id="monslot6"></td>
            <td id="monslot7"></td>
            <td id="monslot8"></td>
            <td id="monslot9"></td>
          </tr>
          <tr>
            <td id="tue">Tuesday</td>
            <td id="tueslot1"></td>
            <td id="tueslot2"></td>
            <td id="tueslot3"></td>
            <td id="tueslot4"></td>
            <td id="tueslot5"></td>
            <td id="tueslot6"></td>
            <td id="tueslot7"></td>
            <td id="tueslot8"></td>
            <td id="tueslot9"></td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td id="wedslot1"></td>
            <td id="wedslot2"></td>
            <td id="wedslot3"></td>
            <td id="wedslot4"></td>
            <td id="wedslot5"></td>
            <td id="wedslot6"></td>
            <td id="wedslot7"></td>
            <td id="wedslot8"></td>
            <td id="wedslot9"></td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td id="thuslot1"></td>
            <td id="thuslot2"></td>
            <td id="thuslot3"></td>
            <td id="thuslot4"></td>
            <td id="thuslot5"></td>
            <td id="thuslot6"></td>
            <td id="thuslot7"></td>
            <td id="thuslot8"></td>
            <td id="thuslot9"></td>
          </tr>
          <tr>
            <td>Friday</td>
            <td id="frislot1"></td>
            <td id="frislot2"></td>
            <td id="frislot3"></td>
            <td id="frislot4"></td>
            <td id="frislot5"></td>
            <td id="frislot6"></td>
            <td id="frislot7"></td>
            <td id="frislot8"></td>
            <td id="frislot9"></td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default FirstTab;
