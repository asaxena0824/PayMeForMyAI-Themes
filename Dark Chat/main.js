let messages = [];
let ignoreCredits = false;
let base64String = null;

function copyText(button) {
  var nextElement = button.nextElementSibling;
  button.classList.remove("hidden");
  button.classList.add("btnNone");
  nextElement.style.display = "inline-block";

  setTimeout(() => {
    button.classList.add("hidden");
    button.classList.remove("btnNone");
    nextElement.style.display = "none";
  }, 2000);

  // Set up the click event to switch back to the copy button
  nextElement.addEventListener("click", function () {
    button.style.display = "inline-block";
    nextElement.style.display = "none";
  });
}

var responses = [
  "Hello, Guest-kun. May I call you like that?",
  "",
  "I'm grateful. But still, I'm exhausted. Oh, I should buy meself new clothes",
];

const chatArea = document.getElementsByClassName("chatarea")[0];
const textArea = document.getElementById("textmessage");
const submitButton = document.getElementById("submit-message");
const clearChat = document.getElementById("clear-chat");
const loader = document.getElementById("loader");
const initialInputHeight = textArea.scrollHeight;

clearChat.onclick = () => {
  document.getElementById("chat-area").innerHTML = "";
};

var responseCounter = 0;
var sendingOkay = true;
const submitMessage = async () => {

    if(!sendingOkay) {
      return;
    }

  sendingOkay = false;

  submitButton.disabled = true;
  //textArea.value = "";
  let linkImgHtml = ''

 if(base64String != null) {
   linkImgHtml += `
       <div class="w-full pt-2 pb-2" style="max-width: 200px;">
           <img src="${base64String}" class="w-full h-full" alt="" />
       </div>
   `;
 }

 //textArea.value = "";
 textArea.style.height = `${initialInputHeight}px`;

 var imageFile = document.getElementById("filePicker").files[0];

  //   submitButton.style.display = "none";
  // loader.style.display = "block";
  // Get the message from the textarea
  let message = textArea.value.trim();
  if (message || imageFile) {
    if (!message) {
      message = " ";
    }
    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
    var msgHtml = `<div class="flex items-start w-full group pb-4 mb-4">
    <div class="flex items-start w-5/6">
        <div
            class="inline-block rounded-full font-bold text-white text-center bg-blue-500 flex justify-center items-center w-12 h-12">
            <div class="w-12 h-12 text-2xl flex items-center justify-center -mt-1">
            <div class="rounded-full overflow-hidden size-12 flex-shrink-0">
                <img src="${user_img}" alt="">
            </div>
            </div>
        </div>
        <div class="ps-2">
            <h4 class="font-15 font-bold">User</h4>
              ${linkImgHtml}
              <p class="font-15" style="white-space: pre-wrap;">${message}</p>
        </div>
    </div>
    <div class="w-1/6 flex justify-center">
        <!-- copy to clipboard -->
        <button class="px-1 py-1 hidden group-hover:block" onclick="copyText(this)">
            <svg fill="#ffffff" width="24px" height="24px" viewBox="-3.6 -3.6 43.20 43.20" version="1.1"
                preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                    stroke="#CCCCCC" stroke-width="0.144" />

                <g id="SVGRepo_iconCarrier">
                    <title>Copy to Clipboard</title>
                    <path
                        d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"
                        class="clr-i-outline clr-i-outline-path-1" />

                    <path
                        d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"
                        class="clr-i-outline clr-i-outline-path-2" />

                    <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"
                        class="clr-i-outline clr-i-outline-path-3" />

                    <path
                        d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"
                        class="clr-i-outline clr-i-outline-path-4" />
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                </g>

            </svg>
        </button>

        <!-- copied button -->
        <button class="hidden px-1 py-1">
            <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px"
                viewBox="0 0 424.113 424.113" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path
                                d="M376.955,120.307c-6.514,0-11.807,5.286-11.807,11.807v215.593c0,22.785-18.539,41.322-41.322,41.322H64.936 c-22.781,0-41.322-18.537-41.322-41.322V88.816c0-22.786,18.541-41.323,41.322-41.323h258.89c6.525,0,11.809-5.287,11.809-11.807 c0-6.521-5.281-11.807-11.809-11.807H64.936C29.137,23.88,0,53.01,0,88.815v258.891c0,35.806,29.137,64.936,64.936,64.936h258.89 c35.812,0,64.938-29.13,64.938-64.936V132.113C388.762,125.594,383.482,120.307,376.955,120.307z" />
                            <path
                                d="M420.654,14.931c-4.611-4.612-12.096-4.612-16.693,0l-237.24,237.228l-59.297-59.291c-4.611-4.611-12.084-4.611-16.695,0 c-4.611,4.612-4.611,12.086,0,16.695l67.656,67.639c2.307,2.308,5.328,3.459,8.348,3.459c3.021,0,6.043-1.151,8.348-3.459 c0-0.006,0-0.012,0.012-0.018L420.654,31.625C425.266,27.017,425.266,19.539,420.654,14.931z" />
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </div>
    </div>`;

    var responseHtml = `
        <div class="flex items-start w-full group pt-2 pb-4 mb-4">
            <div class="flex items-start w-5/6">
                <div class="rounded-full overflow-hidden size-12 flex-shrink-0">
                    <img src="${imgURL}" alt="">
                </div>
                <div class="ps-2" id="block${responseCounter}">
                    <div class="typing-animation" >
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                    </div>
                </div>
            </div>
            <div class="w-1/6 flex justify-center">
                <!-- copy to clipboard -->
                <button class="px-1 py-1 hidden group-hover:block" onclick="copyText(this)">
                    <svg fill="#ffffff" width="24px" height="24px" viewBox="-3.6 -3.6 43.20 43.20" version="1.1"
                        preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                            stroke="#CCCCCC" stroke-width="0.144" />

                        <g id="SVGRepo_iconCarrier">
                            <title>Copy to Clipboard</title>
                            <path
                                d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"
                                class="clr-i-outline clr-i-outline-path-1" />

                            <path
                                d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"
                                class="clr-i-outline clr-i-outline-path-2" />

                            <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"
                                class="clr-i-outline clr-i-outline-path-3" />

                            <path
                                d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"
                                class="clr-i-outline clr-i-outline-path-4" />
                            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                        </g>

                    </svg>
                </button>

                <!-- copied button -->
                <button class="hidden px-1 py-1">
                    <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px"
                        viewBox="0 0 424.113 424.113" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path
                                        d="M376.955,120.307c-6.514,0-11.807,5.286-11.807,11.807v215.593c0,22.785-18.539,41.322-41.322,41.322H64.936 c-22.781,0-41.322-18.537-41.322-41.322V88.816c0-22.786,18.541-41.323,41.322-41.323h258.89c6.525,0,11.809-5.287,11.809-11.807 c0-6.521-5.281-11.807-11.809-11.807H64.936C29.137,23.88,0,53.01,0,88.815v258.891c0,35.806,29.137,64.936,64.936,64.936h258.89 c35.812,0,64.938-29.13,64.938-64.936V132.113C388.762,125.594,383.482,120.307,376.955,120.307z" />
                                    <path
                                        d="M420.654,14.931c-4.611-4.612-12.096-4.612-16.693,0l-237.24,237.228l-59.297-59.291c-4.611-4.611-12.084-4.611-16.695,0 c-4.611,4.612-4.611,12.086,0,16.695l67.656,67.639c2.307,2.308,5.328,3.459,8.348,3.459c3.021,0,6.043-1.151,8.348-3.459 c0-0.006,0-0.012,0.012-0.018L420.654,31.625C425.266,27.017,425.266,19.539,420.654,14.931z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.getElementById("chat-area").innerHTML += msgHtml;
    document.getElementById("chat-area").innerHTML += responseHtml;
    chatArea.scrollTop = chatArea.scrollHeight;

    let chatResponse = "";
    var noError = false;

  if (disablePayments || parseInt(document.getElementById('credits_user').innerHTML) > 0 || ignoreCredits) {
    console.log(disablePayments);
    if (!disablePayments) {
      var generationsElement = document.getElementById('credits_user');
      var currentValue = parseInt(generationsElement.innerText);
      if (!ignoreCredits) {
        generationsElement.innerText = currentValue - 1;
      }
    }

   try {

     let userText = message;

     // Create a new FormData object
     var formData = new FormData();

     // Append JSON data
     formData.append('userText', userText);
     formData.append('botId', botId);
     formData.append('messages', JSON.stringify(messages));

     // Append the image file
     formData.append('uploadfile', imageFile);

     // Make the fetch request
     const response = await fetch('/getResponseImage', {
         method: 'POST',
         body: formData // Set the body as FormData
     });
    // if (!response.ok) {
    //
    // }

    const data = await response.json();
    console.log(data.message);
    chatResponse = data.message;

    if (data.aboutResponse) {
      noError = true;
    }

    if (chatResponse == "error_92930") {
      noError = true;
      chatResponse = "Something went wrong with this request, your credit was not used! Please try again or contact support if problem persists.";
      increaseCredits();
    } else if (chatResponse == "error_99530") {
      noError = true;
      chatResponse = "You have exhausted your credits for this bot. Please purchase more credits to continue using the bot.";
      increaseCredits();
    } else if (chatResponse == "error_29949") {
      noError = true;
      chatResponse = "This request is against the rules of the platform and could not be completed. Your credit was not used.";
      increaseCredits();
    } else if (chatResponse == "error_92103") {
      noError = true;
      chatResponse = "This bot has been made inactive by the creator. Please request them to reactivate it.";
      increaseCredits();
    } else if (chatResponse == "error_92910") {
      noError = true;
      chatResponse = "Please add your OpenAI key to continue using the bot.";
      increaseCredits();
      document.getElementById('chatgptkey-modal').classList.remove('hidden');
    } else {
      messages.unshift(message, chatResponse);
    }

  } catch (err) {
      noError = true;
      chatResponse = "Something went wrong with this request, your credit was not used. Please check the validitity of your OpenAI API key and try again or contact support if problem persists.";
      increaseCredits();
  }

  } else {
    noError = true;
    chatResponse = "You have exhausted your current credits for this bot. Please purchase more credits to continue using the bot using the 'Buy Credits' button on the top.";
  }

    if (messages.length >= 20) {
      messages.splice(18, 2);  // Removes 18th and 19th elements
    }

    setTimeout(() => {
      displayMessage(responseCounter, chatResponse, noError);
      sendingOkay = true;
      responseCounter++;
    }, 1000);
    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
    textArea.value = "";
    document.getElementById('filePicker').value = '';
    base64String = null;
  }
};

const displayMessage = (counter, response, noError) => {
  var formatResponse = formatText2(response);
  if (isDalle && !noError) {
    formatResponse = formatText3(response, size);
  }
  console.log(formatResponse);
  formatResponse = "This is a sample message, feel free to change it.";
  var defualtMsg = `<h4 class="font-15 font-bold">${botName}</h4>
    <p class="font-15">${formatResponse}</p>`;
  document.getElementById(`block${counter}`).innerHTML = defualtMsg;

  submitButton.disabled = false;

  loader.style.display = "none";
  chatArea.scrollTop = chatArea.scrollHeight;
};

submitButton.onclick = submitMessage;
textArea.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitMessage();
  }
});

function increaseCredits() {
  if (!disablePayments) {
    var generationsElement = document.getElementById('credits_user');
    var currentValue = parseInt(generationsElement.innerText);
    generationsElement.innerText = currentValue + 1;
  }
}

function formatText2(text) {
  const escapedUserText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const linkText = escapedUserText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a style='text-decoration: underline;' target='_blank' href='$2?ref=paymeformyai'>$1</a>");
  const boldText = linkText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  const codeText = boldText.replace(/```(\w+)\s*([\s\S]*?)```/g, '<code>$2</code>');
  const codeText1 = codeText.replace(/`([\s\S]*?)`/g, "<code style='background-color: blue; padding: 2px;font-family: monospace;'>$1</code>");
  const withLineBreaks = codeText1.replace(/\n/g, '<br>'); // Replace newline characters with HTML line break elements
  return withLineBreaks;
}

function formatText3(text, size) {

  const dimensions = size.split('x');
  const width = dimensions[0];
  const height = dimensions[1];

  const htmlTemplate = `Here is your requested image:
    <img src="${text}" style="width:100%; height:auto;" alt="Requested Image">
Remember that this bot does not save context, and each request is treated as a new one.
  `;

  return htmlTemplate;
}

textArea.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    textArea.style.height = `${initialInputHeight}px`;
    textArea.style.height = `${textArea.scrollHeight}px`;
});

// convert img to base64
const fileInput = document.querySelector('#filePicker');
const customFileButton = document.querySelector('#customFileButton');

customFileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
        // use a regex to remove data url part
        base64String = reader.result;
        document.getElementsByClassName('img-placeholder')[0].innerHTML =
        `
            <div class="link-img-wrp relative pt-2 ps-2 inline-block">
                <div style="width: 80px; height: 80px;">
                    <button type='button' onclick="unlinkImg()" class="absolute top-1 right-0 cursor-pointer">
                        <svg width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#ffffff"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g>

                        </svg>
                    </button>
                    <div class="rounded-xl overflow-hidden">
                        <img src="${base64String}" alt="" class="h-full w-full" />
                    </div>
                </div>
            </div>
        `;
    };
    reader.readAsDataURL(file);
});

let unlinkImg = () => {
    base64String = null;
    fileInput.value = null;
    fileInput.dispatchEvent(new Event('change'));
    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
};
