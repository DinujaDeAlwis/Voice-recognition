
const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  downloadBtn = document.querySelector(".download"),
  inputLanguage = document.querySelector("#language"),
  clearBtn = document.querySelector(".clear"),
  hiddenText = document.getElementById("hiddenText"),
  ListeningIndicator = document.getElementById("ListeningIndicator");


let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

function speechToText() {
  x = 0;
  y=0;
  try {
    recognition = new SpeechRecognition();
    recognition.lang = "en";
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    ListeningIndicator.innerHTML = "Listening...";
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      //detect when intrim results
      if (event.results[0].isFinal) {
        if(hiddenText.innerText.trim().toLowerCase() == speechResult.toLowerCase()){
          // alert("Correct Answer");
          x = x+1;
          popup(1,console.log(x));
          

        }else{
          popup(0,'Wrong Answer');
        }
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
        clearBtn.click();
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
      downloadBtn.disabled = false;
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        popup(0,'No speech was detected. Stopping...');
      } else if (event.error === "audio-capture") {
        popup(0,'No microphone was found. Ensure that a microphone is installed.');
      } else if (event.error === "not-allowed") {
        popup(0,'Permission to use microphone is blocked.');
      } else if (event.error === "aborted") {
        popup(0,'Listening Stopped.');
      } else {
        popup(0,'Error occurred in recognition: " + event.erro');
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  ListeningIndicator.innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
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

// downloadBtn.addEventListener("click", download);
// alert();

clearBtn.addEventListener("click", () => {107
  result.innerHTML = "";
  downloadBtn.disabled = true;
});


function popup(a=0,b='',c=''){
  var ot='';
  var mg=(a===1) ? 'bx1-g' :'bx1-r';
  ot='<div class="overlay"><div class="bx1 '+mg+'"><div class="msg-x">x</div><div class="msg">Success! +++ message sent successfully.</div></div></div>';
  ot='<div class="overlay"><div class="bx1 '+mg+'"><div class="msg-x">x</div>';
  ot+='<div class="msg">'+b+'</div></div></div>';
  // alert();
  $('.popup').html(ot);
  $('.popup').show();
}