const svgNS = "http://www.w3.org/2000/svg";

const screen = document.createElement('div');
screen.id = 'screen'

const container = document.getElementById('container');
container.style.backgroundColor = 'green';

///////////////////Search area
const searchArea = document.createElement('div');
searchArea.id = 'search-box-container';

container.appendChild(searchArea)

////////////////////GSVG

const gSVG = document.createElementNS(svgNS, "svg");
gSVG.setAttribute("id", 'gSVG');
gSVG.setAttribute("viewBox", "0 0 400 800");

container.appendChild(gSVG);


////////////////////// info box
const infoBox = document.createElement('div');
infoBox.id = 'infoBox';
container.appendChild(infoBox);

function run(){
    buildPhoneScreen('left', "images/IMG_20250131_085011.jpg");
    buildPhoneScreen('middle', "images/middle-up-down.jpg");
    buildPhoneScreen('right', "images/IMG_20250131_084935.jpg");  
}
run();

const mSVG = document.getElementById('middleSVG');
const rSVG = document.getElementById('rightSVG');
const lSVG = document.getElementById('leftSVG');

/////////////////////////////////here we are creating the individual rect elements, setting position, size and inner text. 

function buildRects(){
    buildRect('electricityPrice', '20', '-150', '170', '50', mSVG, 'Here you can see the current electricity prices. This is an average for Germany including tax');
    buildRect('renewable', '200', '-150', '170', '50', mSVG, 'Pressing here will show you the current percentage of renewable energy in the German market');
    buildRect('orderSM', '20', '270', '370','120', mSVG, 'Here you can easily apply for your own smart meter');
    buildRect('incTax', '20', '-100', '250','40', mSVG, 'Here you can set the information to include Tax');
    buildRect('connectWallBox', '20', '750', '180','250', mSVG, 'Here you can connect your wall box');
}

///////////////////////////Creating the phone screen with an SVG inside of him. 

function buildPhoneScreen(id, src){
    const phone = document.createElement('div');
    phone.id = `${id}phone`;
    phone.classList.add('phone-shape');

    console.log(phone.id);

    const phoneScreenWrapper = document.createElement('div');
    phoneScreenWrapper.classList.add('phone-screen-wrapper');

    const img = document.createElement('img');
    img.src = src; 
    img.classList.add('screen-img');

    const svg = document.createElementNS(svgNS, "svg");
    const svgId = `${id}SVG`;
    svg.setAttribute("id", svgId);
    svg.classList.add('svg'); 
    svg.setAttribute("viewBox", "0 0 400 800");

    console.log(svgId);

    img.onload = function() {
        setTimeout(() => {
            const imgRect = img.getBoundingClientRect();

            console.log("Displayed Image Size:", imgRect.width, imgRect.height);
            console.log("Image loaded with natural dimensions:", img.naturalWidth, img.naturalHeight);
    
            svg.setAttribute("width", imgRect.width);
            svg.setAttribute("height", imgRect.height);
    
            console.log("SVG size set:", svg.getAttribute("width"), svg.getAttribute("height"));
    
            buildRects();
        }, 100);
    };

    //console.log("SVG size set:", svg.getAttribute("width"), svg.getAttribute("height"));

    phoneScreenWrapper.appendChild(svg);
    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);
    container.appendChild(phone);
}

///////////////////////////building the rect elemnets in the SVG on each of the images.

function buildRect(id, x, y, width, height, svg, text){
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('id', id);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', 'rgba(255, 165, 0, 0.2)');
    rect.setAttribute('fill', 'transparent');

    rect.style.pointerEvents = 'auto';

    rect.addEventListener('mouseenter', ()=> runInfoBox(id, text));
    rect.addEventListener('mouseleave', ()=> turnOffInfoBox());

    svg.appendChild(rect);
    return rect;
}

//////////////////////////////////////Showing and hidding the Info box. 

let hideTimeout;

function runInfoBox(id, text) {

    clearTimeout(hideTimeout);
    infoBox.innerText = text;
    infoBox.style.visibility = "visible";
    infoBox.style.opacity = "1";
    infoBox.style.transform = "scale(1)";
    connectElements(id);
}


function turnOffInfoBox() {
    infoBox.style.opacity = "0";
    infoBox.style.transform = "scale(0.8)"; 
    hideTimeout =setTimeout(() => {
        infoBox.style.visibility = "hidden";
    }, 300);    
    let existingLine = document.getElementById("connecting-line");
    if (existingLine) existingLine.remove();
}
// /////////////////////////////Creating the line between the info box and the rect element on the image. 

// function connectElements(id){
//     const rect = document.getElementById(id);
//     const infoBox = document.getElementById('infoBox');
//     const gSVG = document.getElementById('gSVG');

//     const rectBox = rect.getBoundingClientRect();
//     const infoBoxRect = infoBox.getBoundingClientRect();

//     function getSVGCoords(x, y) {
//         const point = gSVG.createSVGPoint();
//         point.x = x;
//         point.y = y;
//         return point.matrixTransform(gSVG.getScreenCTM().inverse()); 
//     }

//     const start = getSVGCoords(rectBox.left + rectBox.width / 2, rectBox.top + rectBox.height / 2);
//     const end = getSVGCoords(infoBoxRect.left, infoBoxRect.top + infoBoxRect.height / 2);

//     //console.log("Start Position:", start.x, start.y);
//     //console.log("End Position:", end.x, end.y);

//     // let existingLine = document.getElementById("connecting-line");
//     // if (existingLine) existingLine.remove();

//     const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//     line.setAttribute("id", "connecting-line");
//     line.setAttribute("x1", start.x);
//     line.setAttribute("y1", start.y);
//     line.setAttribute("x2", end.x);
//     line.setAttribute("y2", end.y);
//     line.setAttribute("stroke", "rgba(160, 160, 160)");
//     line.setAttribute("stroke-width", "2");
//     line.setAttribute("pointer-events", "auto");
    
//     gSVG.appendChild(line);
// }

/////////////////////////////Creating the line between the info box and the rect element on the image. 

function animateLine(line, start, end, duration = 100) {
    const startTime = performance.now();

    function updateLine(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

        const newX2 = start.x + (end.x - start.x) * progress;
        const newY2 = start.y + (end.y - start.y) * progress;

        line.setAttribute("x1", start.x);
        line.setAttribute("y1", start.y);
        line.setAttribute("x2", newX2);
        line.setAttribute("y2", newY2);

        if (progress < 1) {
            requestAnimationFrame(updateLine);
        }
    }

    requestAnimationFrame(updateLine);
}

function connectElements(id) {
    const rect = document.getElementById(id);
    const infoBox = document.getElementById('infoBox');
    const gSVG = document.getElementById('gSVG');

    const rectBox = rect.getBoundingClientRect();
    const infoBoxRect = infoBox.getBoundingClientRect();

    function getSVGCoords(x, y) {
        const point = gSVG.createSVGPoint();
        point.x = x;
        point.y = y;
        return point.matrixTransform(gSVG.getScreenCTM().inverse()); 
    }

    const start = getSVGCoords(rectBox.left + rectBox.width / 2, rectBox.top + rectBox.height / 2);
    const end = getSVGCoords(infoBoxRect.left, infoBoxRect.top + infoBoxRect.height / 2);

    let line = document.getElementById("connecting-line");
    if (!line) {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("id", "connecting-line");
        line.setAttribute("stroke", "white");
        line.setAttribute("stroke-width", "2");
        gSVG.appendChild(line);
    }

    animateLine(line, start, end);
}
//////////////////////////////////search input 

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'search-box';
searchInput.placeholder = 'Search...';
searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    const elements = {
        "electricity prices": document.getElementById("electricityPrice"),
        "renewable energy": document.getElementById("hotspotRect"),
        "smart meter": document.getElementById("orderSM"),
        "include tax": document.getElementById("incTax"),
        "wall box": document.getElementById("connectWallBox")
    };

    Object.keys(elements).forEach(key => {
        if (query === key && elements[key]) {
            console.log(`Activating: ${key}`);
            elements[key].dispatchEvent(new Event("mouseenter")); 
        }
    });
});

searchArea.appendChild(searchInput);

//////////////////////////////Q&A section

const qAndAfield = document.createElement('div');
qAndAfield.id = 'q-and-a';

const WhereSM = makeQAndAButton('orderSM', 'Where can I order a smart meter?')
const connectWallBox = makeQAndAButton('connectWallBox', 'How can I connect my wall box?')

function makeQAndAButton(id, text){
    const button = document.createElement('div');
    button.classList.add('q-and-a-button');
    button.innerText = text

    button.addEventListener('click', ()=>{
        const rect = document.getElementById(id);
        // rect.dispatchEvent(new Event("mouseenter")); 
        if (rect) {
            // Smooth scroll to the rect element
            rect.scrollIntoView({ behavior: "smooth", block: "center" });

            // Delay the event triggering slightly to ensure scrolling finishes first
            setTimeout(() => {
                rect.dispatchEvent(new Event("mouseenter"));
            }, 600); // Adjust time based on scrolling speed
        }

    })
    qAndAfield.appendChild(button)
}

searchArea.appendChild(qAndAfield);


// window.addEventListener("resize", connectElements);
// const middlePhone = document.getElementById("middlephone");
// if (middlePhone) {
//     middlePhone.addEventListener("scroll", connectElements);
// } else {
//     console.error("middlephone not found!");
// }

// }
