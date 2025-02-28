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
async function loadImageLinks(offset = 0, limit = 5) {
  try {
    const imageLinks = await readTextFile(offset, limit);

    // Iterate over each image link and create an img element
    imageLinks.forEach((link, index) => {
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
      const comment = document.createElement("button");
      const uniqueCommentId = `addCommentButton-${index}`; // Create unique ID for each comment button
      comment.id = uniqueCommentId;
      const message = document.createElement("img");
      const send = document.createElement("img");
      const context = document.createElement("h1");
      const commentdisplay = document.createElement("div");
      commentdisplay.id = `commentDisplay-${index}`; // Unique ID for comment display
      const commentContainer = document.createElement("div");
      commentContainer.id = `commentContainer-${index}`; // Unique ID using index instead of link
      commentContainer.classList.add("mt-6", "w-full", "max-w-lg", "space-y-4");
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
      like.id = `likeimg-${index}`; // Unique like button ID
      like.addEventListener("click", () => {
        //EVENT to add an like
        console.log("Dynamic button clicked!");
        like.src = "./media/likea.png";
      });
      //COMMENT START
      message.classList.add("w-8", "h-8", "inline-block");
      comment.addEventListener("click", () => {
        console.log(`Post ${index}`);
        commenting(index); // Pass index instead of link
      });
      //COMMENT END
      send.classList.add("w-10", "h-8", "inline-block");
      context.classList.add("text-gray-200");
      addc.classList.add("text-gray-400");
      //top append
      accpfp.src = "./media/pfp.jpg";
      accinfo.innerText = "Trump ";
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
      commentdisplay.appendChild(comment);
      comment.appendChild(message);
      interaction.appendChild(like);
      interaction.appendChild(commentdisplay);
      interaction.appendChild(send);
      //bottom append end
      //acc info end
      const div = document.createElement("div"); //main div used as holder of each image
      div.id = `post-${index}`; // Unique div ID using index
      div.classList.add("overflow-hidden", "relative");
      const img = document.createElement("img"); // Create an img tag
      img.id = `image-${index}`; // Unique image ID
      let clickCount = 0;
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
      img.classList.add("brightness-100", "z-1", "rounded-md");

      //gallery append
      gallery.appendChild(div); // Add the img tag to the gallery
      div.appendChild(img);

      //gallery append end
      //FINAL APPEND-- START
      post.appendChild(acc);
      post.appendChild(gallery);
      post.appendChild(interaction);
      post.appendChild(context);
      commentContainer.appendChild(addc);
      post.appendChild(commentContainer);
      //FINAL APPEND-- END
    });
  } catch (error) {
    console.error("Error loading image links:", error);
  }
}

// Call the function to load the images on page load
loadImageLinks();

let offset = 0;
let limit = 5;
async function loadMoreImages() {
  offset += limit;
  await loadImageLinks(offset, limit);
}
setInterval(loadMoreImages, 10000);

async function commenting(postId) {
  // JavaScript to handle comment functionality
  const addCommentButton = document.getElementById(
    `addCommentButton-${postId}`
  );
  const commentModal = document.getElementById("commentModal");
  const overlay = document.getElementById("overlay");
  const closeModalButton = document.getElementById("closeModalButton");
  const submitCommentButton = document.getElementById("submitCommentButton");
  const commentInput = document.getElementById("commentInput");

  // Store the current post ID in the modal's data attribute
  commentModal.dataset.postId = postId;

  commentModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("Post ID: ", postId);

  // Show the modal
  const showModal = () => {
    commentModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    commentInput.value = ""; // Clear the input field
  };

  // Hide the modal
  const closeModal = () => {
    commentModal.classList.add("hidden");
    overlay.classList.add("hidden");
    commentInput.value = ""; // Clear input when closing
  };

  submitCommentButton.onclick = () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
      // Get the specific comment container for this post
      const commentContainer = document.getElementById(
        `commentContainer-${postId}`
      );
      if (commentContainer) {
        const newComment = document.createElement("div");
        newComment.classList.add(
          "bg-black",
          "p-4",
          "rounded",
          "shadow",
          "border",
          "text-white"
        );
        newComment.textContent = commentText;
        commentContainer.appendChild(newComment);
      }
    }
    closeModal();
  };

  closeModalButton.onclick = closeModal;
  overlay.onclick = closeModal;
  showModal();
}
