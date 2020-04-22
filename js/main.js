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
  color: "#f00",
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
  document.documentElement.style.setProperty("--scale", (vw * 0.9) / 500);
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
let bg = document.getElementById("particles-js");
let sticky = menu.offsetTop;

function menuScroll() {
  if (window.pageYOffset >= sticky) {
    menu.classList.add("sticky");
    bg.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
    bg.classList.remove("sticky");
  }
}
window.onscroll = function () {
  menuScroll();
};

/*-------------------------------------------------------------Particles.js----------------------------------------------------------------------
/*By https://vincentgarreau.com/particles.js/
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

let dtButtons = document.querySelector("#dtCustomApply, #dtCustomReset");
dtButtons.addEventListener("click", (e) => refreshParticles());

function refreshParticles() {
  particleColor = updateParticles();
  changeIconColor("html", "--heading-color", "filterIcon");
  $.each(pJSDom[0].pJS.particles.array, function (i, p) {
    pJSDom[0].pJS.particles.array[i].color.value = particleColor;
    pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(particleColor);
    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(
      particleColor
    );
    pJSDom[0].pJS.particles.shape.stroke.color = hexToRgb(particleColor);
  });
}
particleColor = updateParticles();

particlesJS(
  "particles-js",

  {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: particleColor,
      },
      shape: {
        type: "circle",
        stroke: {
          width: 2,
          color: particleColor,
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 200,
        color: particleColor,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover",
    },
  }
);
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Change color of svg's with filters

Code block by: https://codepen.io/sosuke/pen/Pjoqqp and MultiplyByZer0 for their post https://stackoverflow.com/a/43960991/604861

Modified for own use.

*/
("use strict");

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }

  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
      this.b
    )})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + (value % max);
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(
      2
    )}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(
      5
    )}%);`;
  }
}

function iconHexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

function selectElementColor(element, property) {
  let elementColor = window
    .getComputedStyle(document.querySelector(element))
    .getPropertyValue(property);
  elementColor = elementColor.replace(/\s/g, "");
  return elementColor;
}

function changeIconColor(sampleElement, property, targetElement) {
  //for icons
  const rgb = iconHexToRgb(selectElementColor(sampleElement, property));
  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve();
  //for lander

  // let lossMsg;
  // if (result.loss < 1) {
  //   lossMsg = "This is a perfect result.";
  // } else if (result.loss < 5) {
  //   lossMsg = "The is close enough.";
  // } else if (result.loss < 15) {
  //   lossMsg = "The color is somewhat off. Consider running it again.";
  // } else {
  //   lossMsg = "The color is extremely off. Run it again!";
  // }

  // $('.realPixel').css('background-color', color.toString());
  let icons = document.documentElement.getElementsByClassName(targetElement);
  for (let i = 0; i < icons.length; i++) {
    icons[i].setAttribute("style", result.filter);
  }
  // $('.filterDetail').text(result.filter);
  // $('.lossDetail').html(`Loss: ${result.loss.toFixed(1)}. <b>${lossMsg}</b>`);
}
elem.addEventListener(
  "change",
  (e) => refreshParticles(),
  changeIconColor("html", "--heading-color", "filterIcon")
);
function openHex(element) {
  document.querySelector(element).classList.toggle("openHex");
  console.log("Hex'd");
}
let hexList = document.querySelector("div.hex1", "div.hex2", "div.hex3");
for (let i = 0; i < hexList.length; i++) {
  hexList[i].addEventListener("mouseover", openHex(hexList[i]));
  console.log(hexList);
}

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
