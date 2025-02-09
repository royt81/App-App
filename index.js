const svgNS = "http://www.w3.org/2000/svg";

const screen = document.createElement('div');
screen.id = 'screen'

const container = document.getElementById('container');
container.style.backgroundColor = 'green';

const searchArea = document.createElement('div');
searchArea.id = 'search-box-container';

container.appendChild(searchArea)

const gSVG = document.createElementNS(svgNS, "svg");
gSVG.setAttribute("id", 'gSVG');
gSVG.setAttribute("viewBox", "0 0 400 800");

container.appendChild(gSVG);



function run(){
    buildPhoneScreen('left', "images/IMG_20250131_085011.jpg");
    buildPhoneScreen('middle', "images/middle-up-down.jpg");
    buildPhoneScreen('right', "images/IMG_20250131_084935.jpg");  
}
run();

const mSVG = document.getElementById('middleSVG');
const rSVG = document.getElementById('rightSVG');
const lSVG = document.getElementById('leftSVG');

function buildRects(){
    buildRect('electricityPrice', '20', '-150', '170', '50', mSVG, 'Here you can see the current electricity prices. This is an average for Germany including tax');
    buildRect('renewable', '200', '-150', '170', '50', mSVG, 'Pressing here will show you the current percentage of renewable energy in the German market');
    buildRect('orderSM', '20', '270', '370','120', mSVG, 'Here you can easily apply for your own smart meter');
    buildRect('incTax', '20', '-100', '250','40', mSVG, 'Here you can set the information to include Tax');
    buildRect('connectWallBox', '20', '750', '180','250', mSVG, 'Here you can connect your wall box');
}

function buildPhoneScreen(side, src){
    const phone = document.createElement('div');
    phone.id = `${side}phone`;
    phone.classList.add('phone-shape');

    console.log(phone.id);

    const phoneScreenWrapper = document.createElement('div');
    phoneScreenWrapper.classList.add('phone-screen-wrapper');

    const img = document.createElement('img');
    img.src = src; 
    img.classList.add('screen-img');

    const svg = document.createElementNS(svgNS, "svg");
    const svgId = `${side}SVG`;
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
    
            //const mSVG = document.getElementById('middleSVG');
            if (!mSVG) {
                console.error("middleSVG not found!");
                return;
            }
    
            buildRects();
        }, 100);
    };

    //console.log("SVG size set:", svg.getAttribute("width"), svg.getAttribute("height"));

    phoneScreenWrapper.appendChild(svg);
    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);
    container.appendChild(phone);
}

function buildRect(id, x, y, width, height, svg, text){
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('id', id);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    //rect.setAttribute('fill', 'orange');
    rect.setAttribute('fill', 'rgba(255, 165, 0, 0.2)');
     rect.setAttribute('fill', 'transparent');

    rect.style.pointerEvents = 'auto';

    rect.addEventListener('mouseenter', ()=> runInfoBox(id, text));
    rect.addEventListener('mouseleave', ()=> turnOffInfoBox());

    svg.appendChild(rect);
    return rect;
}

function turnOffInfoBox() {
    infoBox.style.display = "none";
    let existingLine = document.getElementById("connecting-line");
    if (existingLine) existingLine.remove();
}
function runInfoBox(id, text) {
    infoBox.innerText = text;
    infoBox.style.display = "block";

    connectElements(id);
}

function connectElements(id){
    const rect = document.getElementById(id);
    //rect.classList.add = ('orange')
    const infoBox = document.getElementById('infoBox');
    const gSVG = document.getElementById('gSVG');
    //const imageContainer = document.getElementById('middlephone');

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

    //console.log("Start Position:", start.x, start.y);
    //console.log("End Position:", end.x, end.y);

    let existingLine = document.getElementById("connecting-line");
    if (existingLine) existingLine.remove();

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", "connecting-line");
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("pointer-events", "auto");
    
    gSVG.appendChild(line);
}

const infoBox = document.createElement('div');
infoBox.id = 'infoBox';
container.appendChild(infoBox);

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

const qAndAfield = document.createElement('div');
qAndAfield.id = 'q-and-a';

const WhereSM = makeQAndAButton('orderSM', 'Where can I order a smart meter?')

function makeQAndAButton(id, text){
    const button = document.createElement('div');
    button.classList.add('q-and-a-button');
    button.innerText = text

    button.addEventListener('click', ()=>{
        const rect = document.getElementById(id);
        rect.dispatchEvent(new Event("mouseenter")); 

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
