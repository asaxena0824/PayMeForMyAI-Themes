document.getElementById("next-button").addEventListener("click", function() {
    const knowledgeBaseSection = document.getElementById("knowledge-base-section");
    const nextButton = document.getElementById("next-button");

    // Toggle the visibility of the knowledge base section
    if (knowledgeBaseSection.style.display === "none") {
      knowledgeBaseSection.style.display = "block";
      nextButton.innerText = "Create";

      // Hide the other three input fields
      document.getElementById("image").style.display = "none";
      document.getElementById("name").style.display = "none";
      document.getElementById("description").style.display = "none";
    } else {
      knowledgeBaseSection.style.display = "none";
      nextButton.innerText = "Next";

      // Show the other three input fields
      document.getElementById("image").style.display = "block";
      document.getElementById("name").style.display = "block";
      document.getElementById("description").style.display = "block";
    }
});
