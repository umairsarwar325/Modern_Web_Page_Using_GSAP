var timeout;
function loader(){
    var loadingPercentage = document.querySelector("#loading-percentage");
    var preVal = 0;
    var loaderInterval = setInterval(()=>{
        if(preVal < 100){
            preVal += Math.floor(Math.random()*20);
            loadingPercentage.innerHTML = preVal + "%";
        }
        else{
            preVal = 100;
            loadingPercentage.innerHTML = preVal+ "%";
            clearInterval(loaderInterval);
        }
    },100)
}

function circleMouseChpta() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;
    // store preious position of mouse
    var xpre = 0;
    var ypre = 0;
    document.addEventListener("mousemove", (dets) => {
        clearTimeout(timeout);
        var xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xpre);
        var yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - ypre);
        xpre = dets.clientX;
        ypre = dets.clientY;
        circleMouseFollow(xscale, yscale);
        timeout = setTimeout(() => {
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

function circleMouseFollow(xscale, yscale) {
    window.addEventListener("mousemove", (dets) => {
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

function firstPageAnimation() {
    var tl = gsap.timeline();
    tl.to("#loader",{
        onStart:loader(),
        // duaration:1,
        delay:2,
        transform:"translateY(-100%)",
    })
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duaration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".bounding-elem", {
            y: 0,
            stagger: 0.2,
        })
        .from("#hero-footer", {
            y: -10,
            opacity: 0,
            duaration: 1.5,
            ease: Expo.easeInOut,
        })
}

function secondPageAnimation() {
    var elem = document.querySelectorAll(".elem");
    elem.forEach((val) => {
        var rotpos = 0;
        var diffrot; 
        val.addEventListener("mousemove", (dets) => {
            diffrot = dets.clientX - rotpos;
            rotpos = dets.clientX;
            gsap.to(val.querySelector("img"), {
                top: dets.clientY - val.getBoundingClientRect().top,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20,20,diffrot),
            });
        });
        val.addEventListener("mouseenter", (dets) => {
            gsap.to(val.querySelector("img"), {
                opacity: 1,
            });
        });

        val.addEventListener("mouseleave", (dets) => {

            gsap.to(val.querySelector("img"), {
                opacity: 0,

            });
        });

    });
}

circleMouseChpta();
secondPageAnimation();
firstPageAnimation();