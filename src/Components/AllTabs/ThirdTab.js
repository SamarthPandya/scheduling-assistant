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
      });
      fetch(
        "https://iitgtt2022.000webhostapp.com/getrecord.php?id=" +
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
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
    } else {
      return;
    }
  }

  const days = window.timeTable;
  if (window.timeTable == null) {
    return <div>Holiday</div>;
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

  return <div>{slotsToday == null ? "Holiday" : renderTodaysSlots()}</div>;
};

export default ThirdTab;
