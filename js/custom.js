function toggleTab(selectedNav, targetId) {
  topicTabs.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-selected", true);
      navEl.setAttribute('tabindex', 0);
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute("aria-selected", false);
        navEl.setAttribute('tabindex', -1);
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

function initLiveCounter() {
  var liveCounter = document.querySelector("#live-counter");
  var currentCount = 1;

  setInterval(function() { liveCounter.textContent = "Current count: " + currentCount++ }, 1000 * 60);
}

(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  var advancedSkipDropDown = document.querySelector(".advanced-skip-link select");
  advancedSkipDropDown.addEventListener("change", function(event) {
    location = event.target.value;
  });

  initLiveCounter();
})();

var topicsTabList = document.querySelector('#list-of-topics-tabs');
var topicTabs = [...topicsTabList.querySelectorAll("li")];

topicsTabList.addEventListener("keydown", function(event) {
  var currentTab = topicsTabList.querySelector("li.is-active");

  if (topicTabs.includes(document.activeElement)) {
    currentTab = document.activeElement;
  }

  switch(event.keyCode) {
    case 37: { // Arrow left
      if (currentTab.previousElementSibling) {
        currentTab.previousElementSibling.focus();
      } else {
        topicTabs[topicTabs.length - 1].focus();
      }
      break;
    }
    case 39: { // Arrow right
      if (currentTab.nextElementSibling) {
        currentTab.nextElementSibling.focus();
      } else {
        topicTabs[0].focus();
      }
      break;
    }
    case 32: // Space
    case 13: { // Enter
      if (topicTabs.includes(document.activeElement)) {
        document.activeElement.click();
        event.preventDefault();
      }
      break;
    }
    case 36: { // Home
      topicTabs[0].focus();
      event.preventDefault();
      break;
    }
    case 35: { // End
      topicTabs[topicTabs.length - 1].focus();
      event.preventDefault();
      break;
    }
    default: {
      break;
    }
  }
});

topicTabs.forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
  navEl.onkeydown = function() {
    if (event.keyCode == 13) {
      toggleTab(event.target.id, event.target.dataset.target)
    }
  };
});
