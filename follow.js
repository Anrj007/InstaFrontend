function changeHeadingText1() {
  document.getElementById("friendname1").innerText = "Following";
  console.log("following!");
}

function changeHeadingText2() {
  document.getElementById("friendname2").innerText = "Following";
  console.log("following!");
}
function changeHeadingText3() {
  document.getElementById("friendname3").innerText = "Following";
  console.log("following!");
}
function changeHeadingText4() {
  document.getElementById("friendname4").innerText = "Following";
  console.log("following!");
}

function justkidding() {
  tell = document.getElementById("whatsapp");
  const reply = prompt("Transferring to WhatsApp.  okay?(Yes)");
  console.log("just kidding!");
  if (reply) {
    window.location.href = "https://web.whatsapp.com/";
  } else {
    alert("rejecting redirect!");
  }
}
