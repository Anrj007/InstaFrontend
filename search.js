// Function to redirect to an Instagram profile
function redirectToInstagram() {
  // Prompt the user to enter the Instagram username
  const username = prompt("Enter the Instagram username:");

  // Validate that the input is not empty
  if (username) {
    // Construct the Instagram profile URL
    const instagramURL = `https://www.instagram.com/${username.trim()}/`;

    // Redirect to the Instagram profile
    window.location.href = instagramURL;
  } else {
    alert("No username entered. Please try again.");
  }
}
