function confirm() {
  var p = document.getElementsByName("Password")[0].value;
  var cp = document.getElementsByName("CNFPassword")[0].value;
  if (p != cp) {
    window.alert("Passwords do not match");
    return false;
  } else {
    return true;
  }
}

function submission() {
  var userID = document.getElementsByName("Username")[0].value;
  var userPIN = document.getElementsByName("Password")[0].value;
  if (!confirm()) {
    return;
  } else {
    // fill code for user creation in database;
    fetch("https://iitgtt2022.000webhostapp.com/loginADD.php", {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
      body: "id=" + userID + "&pwd=" + userPIN,
    })
      .then(function (response) {
        if(response.status==305) alert("USER ID EXISTS");
        else if(response.status==306) alert("TRY AGAIN");
        else{
          if(window.confirm("Registered Successfully! ")==true){
            // console.log("HOgaya");
            window.location.href="../";
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      event.preventDefault();
  }
}
