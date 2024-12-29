function handleScreenChange(e) {
  const div = document.getElementById("leftside");
  const rightside = document.getElementById("rightside");
  const status1 = document.getElementById("s1");
  const status2 = document.getElementById("s2");
  const status3 = document.getElementById("s3");
  if (e.matches) {
    div.style.display = "none"; // Hide the div for small screens
    rightside.style.display = "none";
    status1.style.display = "none";
    status2.style.display = "none";
    status3.style.display = "none";
  } else {
    div.style.display = "block"; // Show the div for large screens
    rightside.style.display = "block";
  }
}
const mediaQuery = window.matchMedia("(max-width: 768px)");
mediaQuery.addEventListener("change", handleScreenChange);

// Initial check
handleScreenChange(mediaQuery);
