function milliseconds() {
  document.getElementById("user-time").textContent = Date.now();
}
milliseconds();
setInterval(milliseconds, 1000);

