const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;
let loading = false;
const API_KEY = "chat gpt api key here"; // Paste your API key here
let messages = [];
let ignoreCredits = false;

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    const pElement = document.createElement("p");
    pElement.classList.add('text-sm');

    let chatResponse = "";

  if (parseInt(document.getElementById('credits_user').innerHTML) > 0 || ignoreCredits) {
    var generationsElement = document.getElementById('credits_user');
    var currentValue = parseInt(generationsElement.innerText);
    if (!ignoreCredits) {
      generationsElement.innerText = currentValue - 1;
    }

   try {

    const response = await fetch('/getResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userText, botId, messages }),
    });

    // if (!response.ok) {
    //
    // }

    const data = await response.json();
    console.log(data.message);
    chatResponse = data.message;

    if (chatResponse == "error_92930") {
      chatResponse = "Something went wrong with this request, your credit was not used! Please try again or contact support if problem persists.";
      increaseCredits();
    } else if (chatResponse == "error_99530") {
      chatResponse = "You have exhausted your credits for this bot. Please purchase more credits to continue using the bot.";
      increaseCredits();
    } else if (chatResponse == "error_29949") {
      chatResponse = "This request is against the rules of the platform and could not be completed. Your credit was not used.";
      increaseCredits();
    } else if (chatResponse == "error_92910") {
      chatResponse = "Please add your OpenAI key to continue using the bot.";
      increaseCredits();
      document.getElementById('chatgptkey-modal').classList.remove('hidden');
    } else {
      messages.unshift(userText, chatResponse);
    }

  } catch (err) {
      chatResponse = "Something went wrong with this request, your credit was not used. Please check the validitity of your OpenAI API key and try again or contact support if problem persists.";
      increaseCredits();
  }

  } else {
    chatResponse = "You have exhausted your current credits for this bot. Please purchase more credits to continue using the bot using the 'Buy Credits' button below.";
  }

    if (messages.length >= 20) {
      messages.splice(18, 2);  // Removes 18th and 19th elements
    }

    // Send POST request to API, get response and set the reponse as paragraph element text
    /*
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }
    */
    setTimeout(() => {
        pElement.innerHTML = convertToHTMLText(chatResponse);

        // Remove the typing animation, append the paragraph element and save the chats to local storage
        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
        loading = false;
        ignoreCredits = false;
        // storing chats on local system
        //localStorage.setItem("all-chats", chatContainer.innerHTML);
        // chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }, 100);
}

const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    // Display the typing animation and call the getChatResponse function
    const html = `<div class="flex w-full items-start justify-between max-w-2xl">
                    <div class="chat-details flex items-center">
                        <img src="${imgURL}" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded copy-content">content_copy</span>
                </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {

  if (loading) {
    return;
  }

  loading = true;

    document.getElementById('default-container').style.display = "none";
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if (!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="flex w-full items-start justify-between max-w-2xl">
                    <div class="chat-details flex items-center">
                        <img src="img/user.webp" alt="user-img">
                        <p class="text-sm  dark:text-gray-700">${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
    document.getElementById("buyButton").classList.remove('hidden');
}

deleteButton.addEventListener("click", () => {
    // Remove the chats
    if (confirm("Are you sure you want to delete all the chats?")) {

        [...document.getElementsByClassName('chat')].forEach(el => {
            el.remove();
            // Do something with each element
        })
        document.getElementById('default-container').style.display = "flex";
        document.getElementById("buyButton").classList.add('hidden');
    }
});


const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

sendButton.addEventListener("click", handleOutgoingChat);

document.getElementById('chatgptkey-modal-button').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;

    if (apiKey.trim() == "") {return;}

    document.getElementById('chatgptkey-modal-button').disabled = true;
    document.getElementById('textkey').innerHTML = "Saving Key...";
    // document.getElementById('chatgptkey-modal').style.display = "none";
    try {
        const keyResponse = await fetch('/updateOpenAIKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiKey }),
        });

        if (!keyResponse.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await keyResponse.json();

        if (data.message !== "success") {
            document.getElementById('textkey').innerHTML = "Your API Key is invalid or cannot be used. Please try again.<br><br>This error can also occur if you have not attached any payment method to your account. You can do that <a href='https://platform.openai.com/account/billing/payment-methods' style='text-decoration: underline;' target='_blank'>here</a>.";
            return;
        }

        // Handle success here, e.g., close modal or show success message
        document.getElementById('textkey').innerHTML = "Key saved successfully.";

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('textkey').innerHTML = "An error occurred. Please try again.";
    } finally {
        // Re-enable the button or perform other cleanup actions
        document.getElementById('chatgptkey-modal-button').disabled = false;
    }
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('chatgptkey-modal').classList.add('hidden');
});

function chatgptapimodalopen() {
  document.getElementById('chatgptkey-modal').classList.remove('hidden');
}

function moreaboutthisbot() {
  chatInput.value = "Tell me more about this bot";
  ignoreCredits = true;
  handleOutgoingChat();
}

function convertToHTMLText(text) {
  var converter = new showdown.Converter();
  var htmlText = converter.makeHtml(text);

  // Replace <p> tags with plain text
  htmlText = htmlText.replace(/<p>/g, '');

  // Replace </p> tags with <br>
  htmlText = htmlText.replace(/<\/p>/g, '<br>');
  // htmlText = htmlText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  return htmlText;
}

function increaseCredits() {
  var generationsElement = document.getElementById('credits_user');
  var currentValue = parseInt(generationsElement.innerText);
  generationsElement.innerText = currentValue + 1;
}
