import { dispatchData } from "./dispatchData.js";

const tabs = document.querySelectorAll("[data-tab]");
const content = document.getElementById("tab-content");

const tabMessages = {
  all: "All items are shown here.",
  starred: "Starred items are shown here.",
  deleted: "Recently deleted items are shown here.",
};

function renderDispatchInfo(tabType = "all") {
  content.innerHTML = ""; // Clear existing content

  let filteredData = [];
  if (tabType === "all") {
    filteredData = dispatchData;
  } else if (tabType === "starred") {
    filteredData = dispatchData.filter((item) => item.isPreferred);
  } else if (tabType === "deleted") {
    // Filter deleted items
    filteredData = dispatchData.filter((item) => item.isDeleted);
  }

  if (filteredData.length === 0) {
    content.innerHTML = `<p class="text-gray-500">${tabMessages[tabType]}</p>`;
    return;
  }

  filteredData.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("dispatch-info");

    div.innerHTML = `
        <div class="flex flex-col gap-2 group relative" data-index="${index}">
          <div class="px-5 flex items-center gap-3 group-hover:text-red-600">
            <strong>$${item.price?.total || "N/A"}</strong>
            <span>-</span>
            <strong>${item.origin.city}, ${item.origin.state} → ${
      item.destination.city
    }, ${item.destination.state}</strong> 
          </div>
          <div class="px-5 flex items-center gap-3 text-gray-500 text-sm">
            <p>Available: ${new Date(
              item.availableDate
            ).toLocaleDateString()}</p>
            <span>-</span>
            <p>${item.distance} miles</p> 
          </div>
          <div class="absolute top-0 right-0 py-2 px-3 opacity-0 group-hover:opacity-100">
            <i class="fa-regular fa-star text-gray-400 cursor-pointer hover:text-yellow-500 transition-transform duration-300 transform hover:scale-125 ${
              item.isPreferred ? "text-yellow-500" : ""
            }" data-index="${index}"></i>
            <i class="fa-solid fa-trash-can text-gray-600 cursor-pointer pl-2" data-index="${index}"></i>
          </div>
        </div>
      `;

    // Add event listener to the star icon
    const starIcon = div.querySelector(".fa-regular.fa-star");
    starIcon.addEventListener("click", () => {
      item.isPreferred = !item.isPreferred;
      renderDispatchInfo(tabType); // Re-render the filtered data
    });

    // Add event listener to the trash icon for deletion
    const trashIcon = div.querySelector(".fa-solid.fa-trash-can");
    trashIcon.addEventListener("click", () => {
      item.isDeleted = true; // Mark the item as deleted
      renderDispatchInfo(tabType); // Re-render the filtered data
    });

    // Handle item selection by click (highlighting the selected item)
    div.querySelector(".group").addEventListener("click", () => {
      const allItems = document.querySelectorAll(".dispatch-info");
      allItems.forEach((itemDiv) => {
        itemDiv
          .querySelector(".group")
          .classList.remove("bg-white", "text-black");
        itemDiv
          .querySelector(".group")
          .classList.add("bg-gray-100", "text-gray-600");
      });

      const selectedItem = div.querySelector(".group");
      selectedItem.classList.add("bg-white", "text-black");
      selectedItem.classList.remove("bg-gray-100", "text-gray-600");
    });

    content.appendChild(div);
  });
}

window.addEventListener("load", () => {
  const allTab = document.querySelector('[data-tab="all"]');
  allTab.click();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelector(".active-tab")
      .classList.remove("active-tab", "text-blue-500");
    tab.classList.add("active-tab", "text-blue-500");

    const tabType = tab.getAttribute("data-tab");
    renderDispatchInfo(tabType);
  });
});
