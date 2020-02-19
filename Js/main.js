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
}
function dtCustomThemeReset() {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.removeAttribute("style");
  document.getElementById("customThemePreview").removeAttribute("style");
  document.getElementById("customThemePreviewText").removeAttribute("style");
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
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
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
