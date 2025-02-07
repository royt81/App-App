

const svgNS = "http://www.w3.org/2000/svg";

const container = document.getElementById('container');
container.style.backgroundColor = 'green';
const generalSVG = document.createElementNS(svgNS, "svg");
generalSVG.setAttribute("id", 'gSVG');
generalSVG.classList.add('svg'); 
generalSVG.setAttribute("viewBox", "0 0 400 800");


const infoBox = document.createElement('div');
infoBox.id = 'info-window';

const leftSide = buildPhoneScreen('left', "images/IMG_20250131_085011.jpg")
const middleSide = buildPhoneScreen('middle', "images/middle-up-down.jpg")
const rightSide = buildPhoneScreen('right', "images/IMG_20250131_084935.jpg")

function buildPhoneScreen(side, src){

    const phone = document.createElement('div');
    phone.id = `${side}phone`;
    phone.classList.add('phone-shape');

    const phoneScreenWrapper = document.createElement('div');
    phoneScreenWrapper.classList.add('phone-screen-wrapper');

    const img = document.createElement('img');
    img.src = src; 
    img.classList.add('screen-img');

    // const bottom = document.createElement('div');
    // bottom.style.backgroundImage = "url('images/general-down.jpg')";
    // bottom.classList.add('bottom');

    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);
    container.appendChild(phone);
}

//const electricityPrice = buildRect('hotspotRect', '20', '90', '170', '50', mSVG, 'Here you can see the current electricity prices. This is an average for Germany including tax');
const renewableEnergy = buildRect('hotspotRect', '200', '90', '170', '50', 'Pressing here will show you the current percentage of renewable energy in the German markt');
const orderSM = buildRect('orderSM', '20', '500', '400','120', 'Here you can easily apply for your own smart meter');

function buildRect(id, x, y, width, height, text){
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('id', id);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', 'transparent');
    rect.style.pointerEvents = 'auto';
    //infoMElectricityPrice.style.opacity = "0";

    rect.addEventListener('mouseenter', ()=>{
        runInfoWindow(text);
    })
    rect.addEventListener('mouseleave', ()=>{
    })

    generalSVG.appendChild(rect)

    return rect
}


function runInfoWindow(text){
    infoBox.innerText = text;

    container.appendChild(infoBox);
}

function turnOffInfoWindow(){
    const infoWindow = document.getElementById('info-window')
    container.removeChild(infoWindow)
}
///////////////////////////////temp

//const electricityPrice = buildRect('hotspotRect', '20', '90', '170', '50', mSVG, 'Here you can see the current electricity prices. This is an average for Germany including tax');

const electricityPrice = document.createElementNS(svgNS, 'rect');
electricityPrice.setAttribute('id', 'testRect');
electricityPrice.setAttribute('x', '40');
electricityPrice.setAttribute('y', '130');
electricityPrice.setAttribute('width', '170');
electricityPrice.setAttribute('height', '50');
electricityPrice.setAttribute('fill', 'pink');
electricityPrice.style.pointerEvents = 'auto';

let activeLine = null;  

electricityPrice.addEventListener('mouseenter', () => {
    console.log('line1 was hovered');

    // Get the coordinates of the rect (hotspot)
    const rectPos = getGlobalCoords(electricityPrice);

    // Get the coordinates of the info box
    const infoBoxPos = getGlobalCoords(infoBox);

    if (activeLine) {
        generalSVG.removeChild(activeLine);
        activeLine = null;
    }

    // Draw the new line
    activeLine = drawLine(rectPos.x, rectPos.y, infoBoxPos.x, infoBoxPos.y);
});

electricityPrice.addEventListener('mouseleave', () => {
    if (activeLine) {
        generalSVG.removeChild(activeLine);
        activeLine = null;
    }
});

generalSVG.appendChild(electricityPrice);

// Helper function to convert coordinates to the correct space
function getGlobalCoords(element) {
    const rect = element.getBoundingClientRect();
    const svgRect = generalSVG.getBoundingClientRect(); // Get the general SVG's position

    return {
        x: rect.left - svgRect.left + rect.width / 2, 
        y: rect.top - svgRect.top + rect.height / 2
    };
}

// Function to draw a line
function drawLine(x1, y1, x2, y2) {
    console.log('Drawing line from', x1, y1, 'to', x2, y2);

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "3");

    generalSVG.appendChild(line);
    return line;
}
// \container
container.appendChild(generalSVG)

/////////////////////////////Test


const phone = document.createElement('div');
phone.id = `phone`;
phone.classList.add('phone-shape');

const phoneScreenWrapper = document.createElement('div');
phoneScreenWrapper.classList.add('phone-screen-wrapper');

const img = document.createElement('img');
img.src = "images/middle-side.jpeg"; 
img.classList.add('screen-img');

const svg = document.createElementNS(svgNS, "svg");
const svgId = `SVG`
svg.setAttribute("id", svgId);
svg.setAttribute("viewBox", "0 0 800 400");
svg.style.position = "absolute";
svg.style.pointerEvents = "none";

const strompreis = document.createElementNS(svgNS, 'rect');
strompreis.setAttribute('id', 'hotspotRect');
strompreis.setAttribute('x', '20');
strompreis.setAttribute('y', '90');
strompreis.style.pointerEvents = "auto";
strompreis.style.opacity = "0";

strompreis.addEventListener('mouseover', () => {
    console.log( 'This is the Settings button');
});
function runTest(){
    svg.appendChild(strompreis);
    phoneScreenWrapper.appendChild(svg);
    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);
    container.appendChild(phone);
}
//runTest()


//////////////////
