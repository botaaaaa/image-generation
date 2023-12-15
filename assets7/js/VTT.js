// document.addEventListener('DOMContentLoaded', function() {
//     const text = document.querySelector(".convert_text");
//     const click_to_record = document.querySelector(".click_to_record");

//     click_to_record.addEventListener('click', function() {
//         var speech = true;
//         window.SpeechRecognition = window.webkitSpeechRecognition;

//         const recognition = new SpeechRecognition();
//         recognition.interimResults = true;

//         recognition.addEventListener('result', e => {
//             const transcript = Array.from(e.results)
//                 .map(result => result[0])
//                 .map(result => result.transcript)
//                 .join('');

//             text.value = transcript;
//             console.log(transcript);
//         });

//         if (speech == true) {
//             recognition.start();
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const text = document.querySelector(".convert_text");
    const click_to_record = document.querySelector(".click_to_record");

    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = function (event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            text.value = transcript;
            console.log("Transcript:", transcript);
        };

        recognition.onend = function () {
            console.log("Speech recognition ended. Restarting...");
            recognition.start();
        };

        recognition.onerror = function (event) {
            console.error("Speech recognition error:", event.error);
            // You can handle specific errors here
        };

        click_to_record.addEventListener('click', function () {
            if (recognition && !recognition.running) {
                recognition.start();
                console.log("Speech recognition started");
            }
        });
    } else {
        console.error("Web Speech API not supported in this browser");
    }
});

