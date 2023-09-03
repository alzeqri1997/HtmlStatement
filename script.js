const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const AWSconfig = {
    accessKeyId: "AKIA2EB3TL4WG7R53E53",
    secretAccessKey: "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",
    region: "us-east-1"
}

// functions
function bouncer(arr) {
    return arr.filter(function (v) { return !!v; });
}

function hideMiddleNumber(number) {
    return bouncer(number.split(''))[0].slice(5, 4) + string.slice(2).replace(/.(?=...)/g, '*');
}

function formatCreditCardNumber(number) {
    return number.split('').reverse().join('').match(/.{1,4}/g).join(' ').split('').reverse().join('')
}

$(document).ready(function () {
    let isHide = false

    // swiper
    const swiper = new Swiper('.swiper', {
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },

        spaceBetween: 10,
    });

    // selectors
    $.getJSON("./data.json", function (data) {
        $("#client-name").text(data.clientName);

        const month = new Date(data.date).getMonth();

        $("#month").text(monthNames[month]);
        $("#BD").text(data.BD);
        $("#total-BD").text(data.totalBD);
        $("#credit-card-number").text(formatCreditCardNumber(data.creditCardNumber))
        $("#credit-card-name").text(data.fullName)

        // $("#credit-card-details").click(function(){
        //     if(isHide){
        //         $("#credit-card-number").text()
        //     }
        // });





        AWS.config.update(AWSconfig);
        const polly = new AWS.Polly();
        const audio = new Audio();

        function speak(text) {
            // Set up parameters for Polly
            var params = {
                OutputFormat: 'mp3',
                Text: text,
                VoiceId: 'Kendra'
            };
            // Request speech synthesis from Polly
            polly.synthesizeSpeech(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else {
                    // Create audio element and play speech
                    // audio.pause();
                    audio.src = "data:audio/mp3;base64," + data.AudioStream.toString('base64');
                    // audio.play();
                }
            });
        }

        var tabEl = $('button[data-bs-toggle="tab"]')
        tabEl.on('shown.bs.tab', function (event) {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
            console.log('first')
        });

        // setTimeout(openModal, 2000);


        // function openModal() {
        //     $('#modelBtn').click()
        // }

        // speak($(".card-text").text())



        audio.addEventListener("loadeddata", async () => {
            if (audio.readyState >= 2) {
                console.log('this is called')
                audio.play()
                // await audio.play()
            }
        })

        function callSpeakFunction() {
            speak("Hello Gabriel. The month of July you’ve spent 252.500 BD or 78 % out of your 300.000 BD limit, your minimum amount due for this month is 6.320 BD and you can pay until 15.08.2024 that is in 8 days from now.");
        }

        const myModalEl = $('#staticBackdrop');
        myModalEl.on('hide.bs.modal', function (event) {
            setTimeout(callSpeakFunction, 1500);
        });
    });
})
