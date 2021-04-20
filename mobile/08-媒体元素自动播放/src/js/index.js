import "../css/style.css";
console.log(`移动端兼容性处理~`);

let videoObject = {
  el: document.getElementById("video"),
  onload: false,
  play: false
}

videoObject.el.oncanplay = () => {
  videoObject.onload = true;
}

document.addEventListener("touchend", () => {
  if (!videoObject.play) {
    videoObject.el.play();
    videoObject.play = true;
  }
})