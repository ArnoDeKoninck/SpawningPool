//Declerations
// const canvas = document.getElementById("canvas"),
//   ctx = canvas.getContext("2d");
// let colorObject;

//Opens and closes the SideMenu
function menuToggle() {
  let menu = document.getElementById("navMenu");
  let container = document.getElementById("menuContainer");
  let hero = document.getElementById("heroId");
  menu.classList.toggle("menuToggle");
  container.classList.toggle("open");
  hero.classList.toggle("open");
  //console.log(hero);
}

//Ico.ColorPicker API
let colorPicker = new iro.ColorPicker("#dtColorPicker", {
  width: 100,
  color: "#f00"
});
let select = "";
let dtHex = "";
let dtBg = "";
let dtFnt = "";

//Stores the currently selected color in dtHex
function dtColorChange(color, changes) {
  dtHex = colorPicker.color.hexString;
  // print the color's new hex value to the developer console
  //console.log(color.hexString);
}

// listen to a color picker's color:change event
colorPicker.on("color:change", dtColorChange);

function dtBgc() {
  select = document.getElementById("customThemePreview");
  select.style.backgroundColor = dtHex;
  dtBg = dtHex;
}
//Puts dtHex in all the selected items's css Color attribute
function dtTxtc() {
  // select = document.getElementsByClassName("colorText");
  select = document.getElementById("customThemePreviewText");
  // for (let i = 0; i < select.length; i++) { select[i].style.color = dtHex;}
  select.style.color = dtHex;
  dtFnt = dtHex;
}
function dtCustomThemeApply() {
  document.documentElement.setAttribute("data-theme", "custom");
  document.documentElement.style.setProperty("--primary-color", dtBg);
  document.documentElement.style.setProperty("--font-color", dtFnt);
  document.documentElement.style.setProperty("--particle-color", dtBg);
  particleColor = updateParticles();
  // init();
}
function dtCustomThemeReset() {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.removeAttribute("style");
  document.getElementById("customThemePreview").removeAttribute("style");
  document.getElementById("customThemePreviewText").removeAttribute("style");
  particleColor = updateParticles();

  toggleSwitch.checked = false;
}
//DarkMode Switch
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
//Changes the page theme to Dark or Light
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
    particleColor = updateParticles();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
    particleColor = updateParticles();
  }
  //init();
}
//Attempts to load any user preferences, else it write's one
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}
toggleSwitch.addEventListener("change", switchTheme, false);

//Checks for a small viewport
let viewportSmall = false;
function viewportSize() {
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  document.getElementById("displayViewport").innerHTML =
    "Viewport Width: " + vw + " Height: " + vh;

  vw < 560 ? (viewportSmall = true) : (viewportSmall = false);
  console.log(viewportSmall);

  if (viewportSmall == true) {
    document.getElementById("navMenu").classList.add("mobile");
    document.getElementById("heroId").classList.add("mobile");
  } else {
    document.getElementById("navMenu").classList.remove("mobile");
    document.getElementById("heroId").classList.remove("mobile");
  }
}
window.addEventListener("resize", viewportSize);
viewportSize();

function openSettings() {
  let select = document.getElementsByClassName("menu");
  let bottom = document.getElementsByClassName("devContainer");
  select[0].classList.toggle("openSettings");
  bottom[0].classList.toggle("enterBottom");
}
let menu = document.getElementById("navMenu");
let sticky = menu.offsetTop;
function menuScroll() {
  if (window.pageYOffset >= sticky) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}
window.onscroll = function() {
  menuScroll();
};

/*-------------------------------------------------------------Particles----------------------------------------------------------------------
/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */
function updateParticles() {
  particleColor = window
    .getComputedStyle(document.querySelector("html"))
    .getPropertyValue("--particle-color");
  particleColor = particleColor.replace(/\s/g, "");
  return particleColor;
}
elem = document.querySelector("html");
elem.addEventListener("change", e => refreshParticles());
let dtButtons = document.querySelector("#dtCustomApply, #dtCustomReset");
dtButtons.addEventListener("click", e => refreshParticles());

function refreshParticles() {
  $.each(pJSDom[0].pJS.particles.array, function(i, p) {
    pJSDom[0].pJS.particles.array[i].color.value = particleColor;
    pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(particleColor);
    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(
      particleColor
    );
    pJSDom[0].pJS.particles.shape.stroke.color = hexToRgb(particleColor);
    particleColor = updateParticles();
  });
}
particleColor = updateParticles();

particlesJS(
  "particles-js",

  {
    particles: {
      number: {
        value: 300,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: particleColor
      },
      shape: {
        type: "circle",
        stroke: {
          width: 2,
          color: particleColor
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: particleColor,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover"
    }
  }
);

//------------------Hero Bg------------------------------------------------------------------

// function loadColor() {
//   let elem = document.getElementsByClassName("colorbg");
//   let fillColor = window.getComputedStyle(elem[0]);
//   return fillColor;
// }

// colorObject = loadColor();
// let h = {},
//   /**
//       The colors had to be put into global variables because Babel doesn't transpile Object.assign() and some browsers still don't have it!
//     */

//   colBG = "0, 0, 0",
//   colFill = "123, 0, 123";
// colStroke = "123, 0, 123";
// function rgba(rgb, a) {
//   console.log(rgb);
//   console.log(a);
//   return "rgba(" + rgb + "," + a + ")";
// }

// /**
//   A factory function to create the main object to hold the hexagon canvas and whatnot.
//   Terribly convoluted for something so simple :D
// */
// function hexToRGB(h) {
//   let r = 0,
//     g = 0,
//     b = 0;
//   let array = h.split("");
//   array.shift();
//   console.log(array);
//   // 3 digits
//   if (array.length == 4) {
//     r = "0x" + array[1] + array[1];
//     g = "0x" + array[2] + array[2];
//     b = "0x" + array[3] + array[3];

//     // 6 digits
//   } else if (array.length == 7) {
//     console.log("gets here");
//     r = "0x" + array[1] + array[2];
//     g = "0x" + array[3] + array[4];
//     b = "0x" + array[5] + array[6];
//   }

//   return "rgb(" + +r + "," + +g + "," + +b + ")";
// }
// function createHexagonCanvas() {
//   let c = {},
//     sides = 6,
//     angle = (Math.PI * 2) / sides;
//   console.log("dit is de angel" + angle);
//   c.canvas = document.createElement("canvas");
//   c.ctx = c.canvas.getContext("2d");
//   c.size = canvas.width / 20;

//   c.canvas.width = c.size * 2;
//   c.canvas.height = c.size * 2;

//   c.points = createPoints();

//   drawTop();

//   /**
//     Draw the 'sides' at the front of the hexagon.
//   */
//   //right
//   drawSide(0, 1, colFill);
//   //front
//   drawSide(1, 2);
//   //left
//   drawSide(2, 3);

//   return c;

//   /**
//     Creates the 6 points for the top of the hexagon (and for the top of the sides).
//   */
//   function createPoints() {
//     var points = [];
//     for (let p = 0; p < sides; p += 1) {
//       points.push({
//         x: c.canvas.width / 2 + c.size * Math.cos(p * angle),
//         y: c.canvas.height / 2 + c.size * Math.sin(p * angle) * 0.333
//       });
//     }
//     return points;
//   }

//   function drawTop() {
//     c.ctx.lineWidth = 2;
//     c.ctx.linecap = "butt";
//     //top
//     c.ctx.beginPath();
//     c.points.forEach((p, i) => {
//       if (i === 0) {
//         c.ctx.moveTo(p.x, p.y);
//       }
//       c.ctx.lineTo(p.x, p.y);
//     });
//     c.ctx.closePath();
//     c.ctx.fillStyle = hexToRGB(colorObject.getPropertyValue("--bg-color"));
//     c.ctx.fill();
//     c.ctx.fillStyle = hexToRGB(colorObject.getPropertyValue("--bg-color"));
//     c.ctx.fill();
//     c.ctx.strokeStyle = hexToRGB(
//       colorObject.getPropertyValue("--primary-color")
//     );
//     c.ctx.stroke();
//   }

//   function drawSide(from, to, col) {
//     c.ctx.save();
//     c.ctx.beginPath();
//     c.ctx.moveTo(c.points[from].x, c.points[from].y);
//     c.ctx.lineTo(c.points[from].x, c.points[from].y + c.size * 3);
//     c.ctx.lineTo(c.points[to].x, c.points[to].y + c.size * 3);
//     c.ctx.lineTo(c.points[to].x, c.points[to].y);
//     c.ctx.closePath();
//     c.ctx.fillStyle = hexToRGB(colorObject.getPropertyValue("--font-color"));
//     c.ctx.fill();
//     c.ctx.fillStyle = hexToRGB(colorObject.getPropertyValue("--primary-color"));
//     c.ctx.fill();
//     c.ctx.strokeStyle = hexToRGB(
//       colorObject.getPropertyValue("--secondary-color")
//     );
//     c.ctx.stroke();
//     c.ctx.restore();
//   }
// }

// /**
//   Creates the points for where each hexagon will be drawn.
// */
// function populateHexagons() {
//   let hexagons = [],
//     tempArr = [];

//   for (let j = -6; j < (canvas.height / h.canvas.height) * 6; j += 1) {
//     //default was +=1
//     tempArr = [];
//     for (let i = -1; i < canvas.width / h.canvas.width; i += 1) {
//       tempArr.push({
//         x:
//           j % 2 === 0
//             ? i * (h.canvas.width * 1.5) + 3 * (h.canvas.width / 4)
//             : i * (h.canvas.width * 1.5),
//         y: j * (h.canvas.height / 6)
//       });
//     }
//     hexagons.push(tempArr);
//   }

//   return hexagons;
// }

// let counter = 0;

// /**
//   The 'draw loop' which draws the hexagon block canvas in rows across, and columns down, the main canvas.
// */
// function loop() {
//   ctx.save();
//   /**
//     No need to draw a background as the hexagon block canvas' cover the entire main canvas
//   */
//   //ctx.fillStyle = rgba(colBG, 1);
//   //ctx.fillRect(0, 0, canvas.width, canvas.height);

//   //draw
//   h.hexList.forEach((arr, i) => {
//     arr.forEach((hex, j) => {
//       /**
//         Draws the hexagon block canvas to the points held by the main object.
//         The 'y' (vertical point) fluctuates via a cosine wave which is generated by a combination of which horizontal row the block is on, and by a non-local 'counter' variable.
//         Including the row index 'i', ensures that each row is at a different point on the cosine wave. It is subtracted from the counter so that the wave of blocks appears to move down the screen.
//       */
//       ctx.drawImage(
//         h.canvas,
//         hex.x,
//         hex.y + (h.size / 10) * Math.cos(counter - i / 10) // default hex.y + (h.size / 2) * Math.sin(counter - i / 10)
//       );
//     });
//   });

//   counter += 0.02;

//   requestAnimationFrame(loop);
// }

// /**
//   IIFE which sizes the canvas to the body, creates and assigns the main object and begins the loop.
// */
// function init() {
//   let bodyRect = document.body.getBoundingClientRect();

//   canvas.width = bodyRect.width;
//   canvas.height = bodyRect.height;

//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   //Object.assign doesnt work on current android chrome / webkit mobile browsers
//   //h = Object.assign(h, createHexagonCanvas());
//   h = createHexagonCanvas();

//   h.hexList = populateHexagons();

//   loop();
// }

// //init();
