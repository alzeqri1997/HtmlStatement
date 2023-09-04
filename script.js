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


    // Animation
    gsap.registerPlugin(ScrollTrigger);
    const listenBtn = $(".listen-btn");
    const listenTl = gsap.timeline({
        paused: true
    });

    console.log(listenBtn.children()[1])

    // listenBtn.on('mouseenter', ()=>{
    //     gsap.to(listenBtn.children()[1], {
    //         width: "100%",
    //         opacity: "0"
    //     })
    // })
    // listenBtn.on('mouseleave', ()=>{
    //     // console.log('outside')
    // })

    gsap.to(".main-body", {
        opacity: 1,
        ease: "expo.out"
    });


    gsap.from("#top-side", {
        duration: 1.5,
        opacity: "0",
        y: '-30px',
        ease: "expo.out"
    });

    gsap.from(".page-heading", {
        duration: 1.5,
        opacity: "0",
        x: '-30px',
        ease: "expo.out"
    });

    gsap.from(".main-card", {
        duration: 1.5,
        opacity: "0",
        x: '-30px',
        ease: "expo.out"
    });

    gsap.from(".card-details", {
        duration: 1.5,
        opacity: "0",
        x: '-30px',
        ease: "expo.out"
    });

    const progressTl = gsap.timeline({
        paused: true,
        ease: "expo.out",
        defaults: {
            duration: 1.5
        }
    }).from(".progress", {
        opacity: 0,
        x: "-10px",
        stagger: ".1"
    }).from(".progress-bar", {
        duration: 4,
        width: "0",
        ease: "expo.out",
        stagger: ".1"
    }, "<");

    gsap.from(".cardSpendingDetails", {
        scrollTrigger: {
            trigger: ".cardSpendingDetails",
            start: 'top center',
            end: 'bottom center',
            once: true,
            onEnter() {
                progressTl.play()
            },
        },
        duration: 1.5,
        opacity: "0",
        x: '-30px',
        ease: "expo.out"
    });

    gsap.from(".main-information", {
        duration: 1.5,
        opacity: "0",
        x: '30px',
        ease: "expo.out"
    });

    gsap.from(".main-rewards ", {
        scrollTrigger: {
            trigger: ".main-rewards",
        },
        duration: 1.5,
        opacity: "0",
        x: '30px',
        ease: "expo.out"
    });

    gsap.from(".main-offers", {
        scrollTrigger: {
            trigger: ".main-offers",
            start: 'top center',
            end: 'bottom center',
            once: true,
            onEnter() {
                gsap.from(".offer", {
                    duration: 1.5,
                    opacity: 0,
                    x: "30px",
                    ease: "expo.out",
                    stagger: ".1"
                });
            },
        },
        duration: 1.5,
        opacity: "0",
        x: '30px',
        ease: "expo.out"
    });
    // const tabEl = $("a[data-bs-toggle='tab']")

    // tabEl.on("hide.bs.tab", function(event){
    //     const el = $(event.target.dataset.tab)
    //     gsap.to(el,{
    //         y:"30px",
    //         opacity:0
    //     });
    // });
    // tabEl.on("hidden.bs.tab", function(event){
    //     const el = $(event.target.dataset.tab)
    //     gsap.set(el,{
    //         y:"30px",
    //         opacity:0
    //     });
    // });

    const fistTab = $("#ex1-tab-1");
    const secondTab = $("#ex1-tab-2");
    const firstTabContent = $("#ex1-tabs-1");
    const secondTabContent = $("#ex1-tabs-2");
    const tabTl = gsap.timeline({
        paused: true,
        defaults: {
            // ease: "expo.in",
            duration: .3
        },
    })
        .to(firstTabContent, {
            y: '-30px',
            opacity: 0,
        }).set(firstTabContent, {
            display: 'none'
        }).set(secondTabContent, {
            display: 'block',
            opacity: 0
        }).to(secondTabContent, {
            y: "30px",
            opacity: 1,
            onStart(){
                gsap.from(".merchant", {
                    opacity: 0,
                    x: "-30px",
                    stagger: ".1"
                })
            }
        })

    function showTabContent(curr, prev) {
        curr.addClass("show active")
        prev.removeClass("show active")
    }

    fistTab.on("click", function (event) {
        tabTl.reverse();
        if (tabTl.isActive()) {
            progressTl.restart()
        }

    });

    secondTab.on("click", function (event) {
        tabTl.play()
        if (tabTl.isActive()) {
            
        }
        // showTabContent(secondTabContent, firstTabContent)
    });



    // **************
    // Text To Speech
    // **************
    const playBtn = $(".play-btn");
    const pauseBtn = $(".pause-btn");

    const swiper = new Swiper('.swiper', {
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },

        spaceBetween: 10,
    });

    AWS.config.update({
        accessKeyId: "AKIA2EB3TL4WG7R53E53",
        secretAccessKey: "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",
        region: "us-east-1"
    });
    const polly = new AWS.Polly();
    const audio = new Audio();

    function speak(text) {
        // Set up parameters for Polly
        const params = {
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
                // audio.addEventListener("loadeddata", async () => {
                //     if (audio.readyState >= 2) {
                //         console.log('this is called')
                //         // audio.play()
                //         // await audio.play()
                //     }
                // });

            }
        });
    }

    function callSpeakFunction() {
        const monthlySummary = `Welcome Gabriel!, The month of July you’ve spent 252,500 BD or 78% out of your 300,000 BD limit, your minimum amount due for this month is 6,320 BD and you can pay until 15.08.2024 that is in 8 days from now.`;
        speak(`
        ${monthlySummary}
        Here are you card details:
        - Total spent: 252,500 BD.
        -Credit limit: 300,000 BD
        - Available balance: 50,000 BD.
        - Available cash limit: 10,000 BD.
        - Minimum due: 6,000 BD.
        `);
    }

    callSpeakFunction();
    async function play() {
        if (audio.readyState >= 2) {
            console.log('this is called')
            await audio.play();
            return true
        }
        return false
    };

    async function pause() {
        await audio.pause();
    };

    playBtn.on('click', () => {
        play().then((isLoaded) => {
            if (isLoaded) {
                playBtn.css("display", "none");
                pauseBtn.css("display", "block")
            }
        });

    });

    pauseBtn.on('click', () => {
        pause();
        pauseBtn.css("display", "none");
        playBtn.css("display", "block")
    })


    // setTimeout(openModal, 2000);


    function openModal() {
        $('#modelBtn').click()
    }
    var myModalEl = $('#staticBackdrop')
    myModalEl.on('hide.bs.modal', function (event) {
        setTimeout(callSpeakFunction, 1500);
    });


})
