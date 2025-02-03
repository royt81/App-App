

const svgNS = "http://www.w3.org/2000/svg";


const container = document.getElementById('container');
container.style.backgroundColor = 'green';

function run(){
    const leftSide = buildPhoneScreen('left', "images/IMG_20250131_085011.jpg")
    const middleSide = buildPhoneScreen('middle', "images/middle-side.jpeg")
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
    // svg.setAttribute("width", "100%");
    // svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 400 800");
    // svg.style.position = "absolute";
    // svg.style.top = "0";
    // svg.style.left = "0";

    const bottom = document.createElement('div');
    bottom.style.backgroundImage = "url('images/general-down.jpg')";
    bottom.classList.add('bottom');

    console.log(svgId)

    phoneScreenWrapper.appendChild(img);
    phone.appendChild(phoneScreenWrapper);

    container.appendChild(phone);
}

const mySVG = document.getElementById('middleSVG');

const strompreis = document.createElementNS(svgNS, 'rect');
strompreis.setAttribute('id', 'hotspotRect');
strompreis.setAttribute('x', '50');
strompreis.setAttribute('y', '100');
strompreis.setAttribute('width', '120');
strompreis.setAttribute('height', '50');
strompreis.setAttribute('fill', 'orange');

strompreis.addEventListener('mouseover', () => {
    console.log( 'This is the Settings button');
});

mySVG.appendChild(strompreis)




