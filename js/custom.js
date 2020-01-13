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

function openSubMenu(trigger, container) {
  container.classList.add('is-active');
  trigger.setAttribute('aria-expanded', "true");
}

function closeSubMenu(trigger, container) {
  container.classList.remove('is-active');
  trigger.setAttribute('aria-expanded', "false");
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
var topicTabs = Array.from(topicsTabList.querySelectorAll("li"));

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

var subMenu = document.querySelector('#submenu');
var subMenuTrigger = document.querySelector('#submenu-button');
var subMenuContainer = document.querySelector('#sumbenu-container');

var subMenuItems = Array.from(subMenuContainer.querySelectorAll('li')).filter(function(item) { return item.getAttribute("role") !== "separator" });

subMenuTrigger.addEventListener('click', function() {
  if (!subMenuContainer.classList.contains('is-active')) {
    openSubMenu(subMenuTrigger, subMenuContainer);
    subMenuItems[0].firstElementChild.focus();
  }
});

subMenu.addEventListener('mouseenter', function() {
  openSubMenu(subMenuTrigger, subMenuContainer);
});

subMenu.addEventListener('mouseleave', function() {
  closeSubMenu(subMenuTrigger, subMenuContainer);
});

document.addEventListener('click', function(event) {
  if (!subMenu.contains(event.target)) {
    closeSubMenu(subMenuTrigger, subMenuContainer);
  }
});

subMenuContainer.addEventListener('keydown', function(event) {
  var possiblyAnotherActiveItem = subMenuItems.find(function(item) { return item.contains(document.activeElement) });
  var currentItem = possiblyAnotherActiveItem || subMenuItems[0];
  var currentItemIdx = subMenuItems.indexOf(currentItem);

  switch(event.keyCode) {
    case 38: { // Arrow up
      if (subMenuItems[currentItemIdx - 1]) {
        subMenuItems[currentItemIdx - 1].firstElementChild.focus();
      } else {
        subMenuItems[subMenuItems.length - 1].firstElementChild.focus();
      }
      event.preventDefault();
      break;
    }
    case 40: { // Arrow down
      if (subMenuItems[currentItemIdx + 1]) {
        subMenuItems[currentItemIdx + 1].firstElementChild.focus();
      } else {
        subMenuItems[0].firstElementChild.focus();
      }
      event.preventDefault();
      break;
    }
    case 32: // Space
    case 13: { // Enter
      document.activeElement.click();
      event.preventDefault();
      break;
    }
    case 36: { // Home
      subMenuItems[0].firstElementChild.focus();
      event.preventDefault();
      break;
    }
    case 35: { // End
      subMenuItems[subMenuItems.length - 1].firstElementChild.focus();
      event.preventDefault();
      break;
    }
    case 27: { // Escape
      closeSubMenu(subMenuTrigger, subMenuContainer);
      subMenuTrigger.focus();
      event.preventDefault();
      break;
    }
    case 9: { // tab
      closeSubMenu(subMenuTrigger, subMenuContainer);
      break;
    }
    default: {
      break;
    }
  }
});