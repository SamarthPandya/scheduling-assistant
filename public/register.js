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
    console.log("registered Succesfully!");
    document.location.hash = " ";
    console.log(userID);
    console.log(userPIN);
    event.preventDefault();
  }
}
