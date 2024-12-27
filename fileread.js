async function loadImages(imagesrc) {
  try {
    const response = await fetch(
      `http://localhost:3000=${imagesrc}` //http://localhost:3000
    );
    const imageData = await response.blob();
    const imageURL = URL.createObjectURL(imageData);
    return imageURL;
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
}

// Function to read text file seprately
async function readTextFile(offset, limit) {
  const response = await fetch("excuseapi.txt"); // Fetch the text file
  const text = await response.text(); // Read the file content as text
  const imageLinks = text.split("\n").filter((link) => link.trim() !== "");
  const paginatedLinks = imageLinks.slice(offset, offset + limit);
  return paginatedLinks;
}

// Function to load image boxes
async function loadImageLinks(offset = 0, limit = 10) {
  try {
    const imageLinks = await readTextFile(offset, limit);

    // Iterate over each image link and create an img element
    imageLinks.forEach((link) => {
      //acc info add and pfp
      //appending top of post acc
      const post = document.getElementById("posts-of-user"); //main div for a POST
      const gallery = document.createElement("gallery"); //creating gallery div for image
      const acc = document.createElement("div"); //top acc div
      const accinfo = document.createElement("h1"); //top acc info
      const accpfp = document.createElement("img"); //top acc pfp
      //bottom interaction
      const interaction = document.createElement("div");
      const like = document.createElement("img");
      const message = document.createElement("img");
      const send = document.createElement("img");
      const context = document.createElement("h1");
      const addc = document.createElement("h2");
      //bottom interaction end
      //classes--
      acc.classList.add(
        "ml-5",
        "mt-20",
        "mr-5",
        "max-w-2xl",
        "max-h-3xl",
        "mb-5"
      );
      accinfo.classList.add("text-lg", "inline-block");
      accpfp.classList.add(
        "w-7",
        "h-7",
        "mr-10",
        "inline-block",
        "rounded-full"
      );

      interaction.classList.add("mt-3", "flex", "flex-row", "gap-2");
      like.classList.add("w-10", "h-8", "inline-block");
      like.id = "likeimg";
      like.addEventListener("click", () => {
        console.log("Dynamic button clicked!");
        like.src = "./media/likea.png";
      });
      message.classList.add("W-8", "h-8", "inline-block");
      send.classList.add("w-10", "h-8", "inline-block");
      context.classList.add("text-gray-200");
      addc.classList.add("text-gray-400");
      //top append
      accpfp.src = "./media/pfp.jpg";
      accinfo.innerText = "Anonymous ";
      accinfo.insertBefore(accpfp, accinfo.firstChild);
      acc.appendChild(accinfo);
      //top append end
      //bottom append
      context.innerText =
        "Images are fetched from Reddit server and are not stored on device.";
      addc.innerText = "Add a comment..";
      like.src = "./media/like.png";
      message.src = "./media/message.png";
      send.src = "./media/send.png";
      interaction.appendChild(like);
      interaction.appendChild(message);
      interaction.appendChild(send);
      //bottom append end
      //acc info end
      const div = document.createElement("div"); //main div used as holder of each image
      div.id = link.trim();
      div.classList.add("overflow-hidden", "relative");
      const img = document.createElement("img"); // Create an img tag
      img.id = "imageid"; //using image src as image id
      clickCount = 0;
      img.addEventListener("click", () => {
        clickCount++; // Increment the counter on each click
        if (clickCount === 2) {
          // Check if it's the second click
          console.log("Dynamic button clicked twice!");
          like.src = "./media/likea.png"; // Change the image source
          clickCount = 0; // Reset the counter if needed for future clicks
        }
      });
      img.src = link.trim(); // Set the src to the image link
      img.alt = "yourwallpaper";
      img.classList.add("brightness-100", "z-1", "rounded-2xl");

      //gallery append
      gallery.appendChild(div); // Add the img tag to the gallery
      div.appendChild(img);

      //gallery append end
      //FINAL APPEND-- START
      post.appendChild(acc);
      post.appendChild(gallery);
      post.appendChild(interaction);
      post.appendChild(context);
      post.appendChild(addc);
      //FINAL APPEND-- END
    });
  } catch (error) {
    console.error("Error loading image links:", error);
  }
}

// Call the function to load the images on page load
loadImageLinks();

let offset = 0;
let limit = 10;
async function loadMoreImages() {
  offset += limit;
  await loadImageLinks(offset, limit);
}
setInterval(loadMoreImages, 10000);
