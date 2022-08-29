import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";
import "./FirstTab.css";

//window.timeTable = null;

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
  function loadTT() {
    fetch(
      "https://iitgtt2022.000webhostapp.com/gettt.php?id=" +
        sessionStorage.getItem("id"),
      {
        credentials: "include",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: "GET",
      }
    )
      .then(function (response) {
        var x = response.json().then((data) => {
          var res = data;
          window.timeTable = res;

          console.log(res);
          for (const it in res) {
            const curr = res[it];
            for (const slott in curr) {
              const temp = (it + slott).toLocaleLowerCase();
              console.log(temp);
              if (temp) {
                document.getElementById(temp).innerHTML = res[it][slott];
              }
            }
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  loadTT();
  function addSlot() {
    const n = document.getElementById("Alias").value;
    if (n == "") {
      n = slotMap[selectedSlotIndex];
    }
    var selectedSlotName = n;
    slots[slotMap[selectedSlotIndex]] = selectedSlotName;
    var selectedSlot = document.getElementById(slotMap[selectedSlotIndex]);
    selectedSlot.setAttribute("disabled", "1");
    console.log(slots);
    console.log(passToDB);
    // this will add data to database
    var ps =
      "id=" +
      sessionStorage.getItem("id") +
      "&sl=" +
      passToDB +
      "&cr=" +
      selectedSlotName;

    var ps =
      "id=" +
      sessionStorage.getItem("id") +
      "&sl=" +
      passToDB +
      "&cr=" +
      selectedSlotName;
    fetch("https://iitgtt2022.000webhostapp.com/fetch.php?" + ps, {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "GET",
    })
      .then(function (response) {
        console.log("ADDED to DB");
        // this will display on table
        loadTT();
      })
      .catch(function (error) {
        console.log(error);
      });
    localStorage.setItem(slotMap[selectedSlotIndex], selectedSlotName);
  }
  const clearAll = () => {
    window.timeTable = null;
    var temp = document.getElementsByTagName("option");
    // clear from database
    fetch("https://iitgtt2022.000webhostapp.com/clear.php", {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
      body: "id=" + sessionStorage.getItem("id"),
    }).then(console.log("CLEARED FROM DATABASE"));

    fetch("https://iitgtt2022.000webhostapp.com/clear.php", {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
      body: "id=" + sessionStorage.getItem("id"),
    }).then(console.log("CLEARED FROM DATABASE"));

    for (var i = 0; i < 24; i++) {
      if (temp[i] != undefined && temp[i].disabled) {
        temp[i].removeAttribute("disabled");
      }
      localStorage.removeItem(slotMap[i]);
      slots[slotMap[i]] = "";
    }
    var tableCells = document.getElementsByClassName("lecture");
    for (var m = 0; m < 45; m++) {
      tableCells[m].innerHTML = "";
    }
  };
  return (
    <div className="FirstTab">
      <div className="input">
        <input
          id="Alias"
          maxLength="15"
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
      <div className="tableBox">
        <table>
          <tr>
            <th>Day Vs. Time</th>
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
            <td id="dayOfWeek">Monday</td>
            <td id="monslot1" className="lecture"></td>
            <td id="monslot2" className="lecture"></td>
            <td id="monslot3" className="lecture"></td>
            <td id="monslot4" className="lecture"></td>
            <td id="monslot5" className="lecture"></td>
            <td id="monslot6" className="lecture"></td>
            <td id="monslot7" className="lecture"></td>
            <td id="monslot8" className="lecture"></td>
            <td id="monslot9" className="lecture"></td>
          </tr>
          <tr>
            <td id="dayOfWeek">Tuesday</td>
            <td id="tueslot1" className="lecture"></td>
            <td id="tueslot2" className="lecture"></td>
            <td id="tueslot3" className="lecture"></td>
            <td id="tueslot4" className="lecture"></td>
            <td id="tueslot5" className="lecture"></td>
            <td id="tueslot6" className="lecture"></td>
            <td id="tueslot7" className="lecture"></td>
            <td id="tueslot8" className="lecture"></td>
            <td id="tueslot9" className="lecture"></td>
          </tr>
          <tr>
            <td id="dayOfWeek">Wednesday</td>
            <td id="wedslot1" className="lecture"></td>
            <td id="wedslot2" className="lecture"></td>
            <td id="wedslot3" className="lecture"></td>
            <td id="wedslot4" className="lecture"></td>
            <td id="wedslot5" className="lecture"></td>
            <td id="wedslot6" className="lecture"></td>
            <td id="wedslot7" className="lecture"></td>
            <td id="wedslot8" className="lecture"></td>
            <td id="wedslot9" className="lecture"></td>
          </tr>
          <tr>
            <td id="dayOfWeek">Thursday</td>
            <td id="thuslot1" className="lecture"></td>
            <td id="thuslot2" className="lecture"></td>
            <td id="thuslot3" className="lecture"></td>
            <td id="thuslot4" className="lecture"></td>
            <td id="thuslot5" className="lecture"></td>
            <td id="thuslot6" className="lecture"></td>
            <td id="thuslot7" className="lecture"></td>
            <td id="thuslot8" className="lecture"></td>
            <td id="thuslot9" className="lecture"></td>
          </tr>
          <tr>
            <td id="dayOfWeek">Friday</td>
            <td id="frislot1" className="lecture"></td>
            <td id="frislot2" className="lecture"></td>
            <td id="frislot3" className="lecture"></td>
            <td id="frislot4" className="lecture"></td>
            <td id="frislot5" className="lecture"></td>
            <td id="frislot6" className="lecture"></td>
            <td id="frislot7" className="lecture"></td>
            <td id="frislot8" className="lecture"></td>
            <td id="frislot9" className="lecture"></td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default FirstTab;
