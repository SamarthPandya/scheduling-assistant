import "./ThirdTab.css";

const timeSlotMap = {
  1: { name: "SLOT1", time: "7:55 - 8:50" },
  2: { name: "SLOT2", time: "9:00 - 9:55" },
  3: { name: "SLOT3", time: "10:00 - 10:55" },
  4: { name: "SLOT4", time: "11:00 - 11:55" },
  5: { name: "SLOT5", time: "12:00 - 12:55" },
  6: { name: "SLOT6", time: "2:00 - 2:55" },
  7: { name: "SLOT7", time: "3:00 - 3:55" },
  8: { name: "SLOT8", time: "4:00 - 4:55" },
  9: { name: "SLOT9", time: "5:00 - 5:55" },
};

const ThirdTab = () => {
  function handleAttend(e) {
    // fill code for attendance updation in data base
    if (
      window.confirm(
        "You won't be able revert back. Mark this lecture as attended?"
      ) == true
    ) {
      var cont = e.target.parentNode;
      window.cont = cont;
      console.log("attended");
      console.log(cont);
      fetch("https://iitgtt2022.000webhostapp.com/addatd.php", {
        credentials: "include",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: "POST",
        body:
          "id=" +
          sessionStorage.getItem("id") +
          "&cr=" +
          window.cont.getElementsByClassName("slotTodayName")[0].innerHTML,
      }).then(() => {
        e.target.disabled = "true";
        e.target.style.backgroundColor = " #1DB954";
        e.target.style.boxShadow = "none";
        e.target.innerHTML = "Done";
        e.target.style.fontWeight = "bold";
        var cont = e.target.parentNode;
        cont.style.backgroundColor = " #1DB954";
        fetch(
          "https://iitgtt2022.000webhostapp.com/getrecord.php?id=" +
            sessionStorage.getItem("id"),
          {
            credentials: "include",
            headers: {
              "Content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            method: "GET",
          }
        )
          .then(function (response) {
            console.log("Aagaya attendance");
            response.json().then((res) => {
              window.attended = res;
              // data = res;
              // console.log(data);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        fetch(
          "https://iitgtt2022.000webhostapp.com/getatd.php?id=" +
            sessionStorage.getItem("id"),
          {
            credentials: "include",
            headers: {
              "Content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            method: "GET",
          }
        )
          .then(function (response) {
            console.log("Aagaya data bhai Hurray!!");
            response.json().then((res) => {
              window.data = res;
              // data = res;
              // console.log(data);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } else {
      return;
    }
  }

  const days = window.timeTable;
  if (window.timeTable == null) {
    return (
      <div className="holiday">
        <img src="./holiday.gif"></img>
      </div>
    );
  }
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const d = new Date();
  let day = weekdays[d.getDay()];
  const slotsToday = days[day];
  console.log(slotsToday);
  function renderTodaysSlots() {
    const attendedSlots = window.attended;
    const n = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="thirdTab">
        <div className="todayContainer">
          {n.map(function (item, i) {
            if (slotsToday[timeSlotMap[item].name] != null) {
              if (attendedSlots[slotsToday[timeSlotMap[item].name]] == 0) {
                return (
                  <div key={i} className="slotToday">
                    <div className="slotTodayName">
                      {slotsToday[timeSlotMap[item].name]}
                    </div>
                    <div className="slotTodayTime">
                      {timeSlotMap[item].time}
                    </div>
                    <div className="tickBox"></div>
                    <button
                      id="handleAttend"
                      type="button"
                      defaultValue="false"
                      onClick={handleAttend}
                    >
                      &#10004;
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className="slotToday"
                    style={{ backgroundColor: "#1DB954" }}
                  >
                    <div className="slotTodayName">
                      {slotsToday[timeSlotMap[item].name]}
                    </div>
                    <div className="slotTodayTime">
                      {timeSlotMap[item].time}
                    </div>
                    <div className="tickBox"></div>
                    <button
                      style={{
                        backgroundColor: "#1DB954",
                        boxShadow: "none",
                        fontWeight: "bold",
                      }}
                      id="handleAttend"
                      type="button"
                      disabled="true"
                    >
                      Done
                    </button>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {slotsToday == null ? (
        <div id="holiday">
          No Lectures today. Sit back and relax!
          <div style={{ border: "4px dotted black" }}>
            <img
              src="data:image/png;base64,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"
              alt="unavailable"
            ></img>
          </div>
        </div>
      ) : (
        renderTodaysSlots()
      )}
    </div>
  );
};

export default ThirdTab;
