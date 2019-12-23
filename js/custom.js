(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  var advancedSkipDropDown = document.querySelector('.advanced-skip-link select');
  advancedSkipDropDown.addEventListener('change', function(event) {
    location = event.target.value;
  });

  var liveCounter = document.querySelector('#live-counter');
  var currentCount = 1;

  setInterval(() => { liveCounter.textContent = 'Current count: ' + currentCount++ }, 1000 * 60)
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
  navEl.onkeydown = function() {
    if (event.keyCode == 13) {
      toggleTab(event.target.id, event.target.dataset.target)
    }
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-selected", true);
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute("aria-selected", false);
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

