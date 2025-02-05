

const svgNS = "http://www.w3.org/2000/svg";


const container = document.getElementById('container');
container.style.backgroundColor = 'green';

function run(){
    const leftSide = buildPhoneScreen('left', "images/IMG_20250131_085011.jpg")
    const middleSide = buildPhoneScreen('middle', "images/middle-up-down.jpg")
    const rightSide = buildPhoneScreen('right', "images/IMG_20250131_084935.jpg")
}

run()


function buildPhoneScreen(side, src){

    const phone = document.createElement('div');
    phone.id = `${side}phone`;
    phone.classList.add('phone-shape');

    const phoneScreenWrapper = document.createElement('div');
    phoneScreenWrapper.classList.add('phone-screen-wrapper');

    const img = document.createElement('img');
    img.src = src; 
    img.classList.add('screen-img');


    const svg = document.createElementNS(svgNS, "svg");
    const svgId = `${side}SVG`
    svg.setAttribute("id", svgId);
    svg.classList.add('svg'); 
    svg.setAttribute("viewBox", "0 0 400 800");

    const bottom = document.createElement('div');
    bottom.style.backgroundImage = "url('images/general-down.jpg')";
    bottom.classList.add('bottom');

    console.log(svgId)

    phoneScreenWrapper.appendChild(svg);
    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);
    container.appendChild(phone);
}

const mSVG = document.getElementById('middleSVG');

const electricityPrice = buildRect('hotspotRect', '20', '90', '170', '50', mSVG, 'Here you can see the current electricity prices. This is an average for Germany including tax');
const renewableEnergy = buildRect('hotspotRect', '200', '90', '170', '50', mSVG, 'Pressing here will show you the current percentage of renewable energy in the German markt');
const orderSM = buildRect('orderSM', '20', '500', '400','120', mSVG, 'Here you can easily apply for your own smart meter');




function buildRect(id, x, y, width, height, svg, text){
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
        turnOffInfoWindow()
    })

    svg.appendChild(rect)

    return rect
}


function runInfoWindow(text){
    const infoWindow = document.createElement('div');
    infoWindow.id = 'infoWindow';
    infoWindow.classList.add('info-window');
    infoWindow.innerText = text;

    container.appendChild(infoWindow);
}

function turnOffInfoWindow(){
    const infoWindow = document.getElementById('infoWindow')
    container.removeChild(infoWindow)
}

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
