window.onload = function () {
  let correctWordCount = 0;
  let recording = false;

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
    recognition;
  recognition = new SpeechRecognition();
  recognition.lang = "en";
  recognition.interimResults = true;


  const recordBtn = document.querySelector(".record");
  const result = document.querySelector(".result"),
    downloadBtn = document.querySelector(".download"),
    inputLanguage = document.querySelector("#language"),
    clearBtn = document.querySelector(".clear"),
    hiddenText = document.getElementById("hiddenText"),
    startIndicator = document.getElementById("startIndicator"),
    ListeningIndicator = document.getElementById("ListeningIndicator");

    recognition.onsoundstart = ()=>{
      ListeningIndicator.classList.remove("d-none");
      ListeningIndicator.classList.add("d-block");
    }

    recognition.onsoundend = ()=>{
      ListeningIndicator.classList.add("d-none");
      ListeningIndicator.classList.remove("d-block");
    }

  recognition.onstart = () => {
    recordBtn.classList.add("recording");
    startIndicator.innerHTML = "Listening...";
  };

  recognition.onend = () => {
    speechToText();
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;

    if (event.results[0].isFinal) {

      //split speech result into words
      const words = speechResult.split(" ");
      //last word
      const lastWord = words[words.length - 1];

      if (hiddenText.innerText.trim().toLowerCase() == lastWord.toLowerCase()) {
        correctWordCount++;
        popup('success', 'Correct Answer :' + lastWord);
        updateCorrectWordCount(correctWordCount);
      } else {
        popup('danger', 'Wrong Answer');
      }

      result.innerHTML += " " + speechResult;
      result.querySelector("p").remove();
    } else {
      //creative p with class interim if not already there
      if (!document.querySelector(".interim")) {
        const interim = document.createElement("p");
        interim.classList.add("interim");
        result.appendChild(interim);
      }
      //update the interim p with the speech result
      document.querySelector(".interim").innerHTML = " " + speechResult;
    }
  };

  recognition.onerror = (event) => {
    stopRecording();
    if (event.error === "no-speech") {
      popup('danger', 'No speech was detected. Stopping...');
    } else if (event.error === "audio-capture") {
      popup('danger', 'No microphone was found. Ensure that a microphone is installed.');
    } else if (event.error === "not-allowed") {
      popup('danger', 'Permission to use microphone is blocked.');
    } else if (event.error === "aborted") {
      popup('danger', 'Listening Stopped.');
    } else {
      popup('danger', 'Error occurred in recognition:' + event.error);
    }
  };


  async function speechToText() {
    try {
      if (!recording) {
        await recognition.start();
        startIndicator.innerHTML = "Listening...";
      }else {
        startIndicator.innerHTML = "";
        recognition.stop();
      }
    } catch (error) {
      recording = false;
      console.log(error);
      startIndicator.innerHTML = "Error occurred in recognition:" + JSON.stringify(error);
    }
  }

  function download() {
    const text = result.innerText;
    const filename = "speech.txt";

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // clearBtn.addEventListener("click", () => {
  //   107
  //   result.innerHTML = "";
  //   downloadBtn.disabled = true;
  // });

  recordBtn.addEventListener("click",() => speechToText());


  // helper functions
  function popup(variant, msg) {
    showToast(msg, variant);
    const popupDiv = document.getElementById("popup");
    popupDiv.innerHTML = msg;

    popupDiv.classList.remove("alert-success");
    popupDiv.classList.remove("alert-danger");
    popupDiv.classList.remove("alert-warning");
    popupDiv.classList.remove("alert-info");

    popupDiv.classList.add("alert-" + variant);
  }

  function showToast(message, variant) {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `rounded-pill text-white bg-${variant}`;
    toast.style.width = '250px';

    toast.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast)

    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 3000);
}

  function updateCorrectWordCount(count) {
    document.getElementById("correctWordCount").innerHTML = count;
  }

}



