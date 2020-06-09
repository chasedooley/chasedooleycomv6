/*
Author: Chase M. Dooley
Date: June 5, 2020
Description: Code provides filtration functionality for the activity feed on my homepage at chasedooley.com
Things to consider in the future: Get DRY with forEach method, efficiency
*/

const FEED = Array.from(document.querySelectorAll("#item-feed li"));
const btns = document.querySelectorAll(".tags button"); // filter buttons

const url = new URL(window.location.href);
const filterParam = url.searchParams.get("filter");
const validFilterParam = (function () {
  // Checks if filterParam can filter the feed (i.e. if it exists in the filter buttons)
  if (filterParam === null) return false;
  let result = false;
  btns.forEach((btn) => {
    if (btn.innerHTML.includes(filterParam)) {
      result = true;
    }
  });
  return result;
})();

function filterFeed(target) {
  // Filters feed-item list on target param
  FEED.forEach((el) => {
    if (!el.innerHTML.includes(target)) {
      el.classList.toggle("hidden");
    }
  });

  // Hides filter buttons on target param
  btns.forEach((btn) => {
    if (!btn.innerHTML.includes(target)) {
      btn.parentElement.classList.toggle("hide");
    } else {
      btn.classList.toggle("active");
    }
  });
}

if (validFilterParam) {
  // Calls filterFeed if a valid URL filterParam was found
  filterFeed(filterParam);
}

// Event Listeners
btns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    // Listens for filter button clicks and calls filterFeed with passed button innerHTML
    filterFeed(event.target.innerHTML);
  })
);
