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
      console.log("attended");
      e.target.disabled = "true";
      e.target.style.backgroundColor = " #1DB954";
      e.target.style.boxShadow = "none";
      e.target.innerHTML = "Done";
      e.target.style.fontWeight = "bold";
      var cont = e.target.parentNode;
      cont.style.backgroundColor = " #1DB954";
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
    const n = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="thirdTab">
        <div className="todayContainer">
          {n.map(function (item, i) {
            if (slotsToday[timeSlotMap[item].name] != null) {
              return (
                <div key={i} className="slotToday">
                  <div className="slotTodayName">
                    {slotsToday[timeSlotMap[item].name]}
                  </div>
                  <div className="slotTodayTime">{timeSlotMap[item].time}</div>
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
            }
          })}
        </div>
      </div>
    );
  }

  return <div>{slotsToday == null ? "Holiday" : renderTodaysSlots()}</div>;
};

export default ThirdTab;
