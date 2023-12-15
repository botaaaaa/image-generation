const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector(".btn");

console.log(speechBtn);

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});

// const textarea = document.querySelector("textarea"),
//   voiceList = document.querySelector("select"),
//   speechBtn = document.querySelector(".btn");

//   console.log(speechBtn);

// let synth = speechSynthesis,
//   isSpeaking = false;

// voices();

// function voices() {
//   for (let voice of synth.getVoices()) {
//     let selected = voice.name === "Google US English" ? "selected" : "";
//     let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
//     voiceList.insertAdjacentHTML("beforeend", option);
//   }
// }

// synth.addEventListener("voiceschanged", voices);

// function textToSpeech(text) {
//   let utterance = new SpeechSynthesisUtterance(text);
//   for (let voice of synth.getVoices()) {
//     if (voice.name === voiceList.value) {
//       utterance.voice = voice;
//     }
//   }

//   // Event listener for when the synthesis is complete
//   utterance.onend = function () {
//     isSpeaking = false;
//     speechBtn.innerText = "Convert To Speech";
//   };

//   synth.speak(utterance);
// }

// function downloadSpeech() {
//   if (textarea.value !== "") {
//     // Create a new SpeechSynthesisUtterance for downloading
//     let downloadUtterance = new SpeechSynthesisUtterance(textarea.value);
//     for (let voice of synth.getVoices()) {
//       if (voice.name === voiceList.value) {
//         downloadUtterance.voice = voice;
//       }
//     }

//     // Event listener for when the synthesis is complete
//     downloadUtterance.onend = function () {
//       let blob = new Blob([new Uint8Array([0xfe, 0xff]), textarea.value], {
//         type: "audio/wav",
//       });

//       // Create a download link and trigger a click event to start the download
//       let url = URL.createObjectURL(blob);
//       let a = document.createElement("a");
//       a.href = url;
//       a.download = "speech.wav";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     };

//     // Trigger the speech synthesis for download
//     synth.speak(downloadUtterance);
//   }
// }

// speechBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (textarea.value !== "") {
//     if (!synth.speaking) {
//       isSpeaking = true;
//       speechBtn.innerText = "Pause Speech";
//       textToSpeech(textarea.value);
//     } else {
//       // Pause or resume speech synthesis based on the current state
//       if (isSpeaking) {
//         synth.pause();
//         isSpeaking = false;
//         speechBtn.innerText = "Resume Speech";
//       } else {
//         synth.resume();
//         isSpeaking = true;
//         speechBtn.innerText = "Pause Speech";
//       }
//     }
//   }
// });

// // Add an event listener for a separate button to trigger speech download
// document.querySelector("#downloadBtn").addEventListener("click", (e) => {
//   e.preventDefault();
//   downloadSpeech();
//   console.log("hi");
// });
