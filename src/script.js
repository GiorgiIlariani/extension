import { dispatchData } from "./dispatchData.js";

const tabs = document.querySelectorAll("[data-tab]");
const content = document.getElementById("tab-content");
const detailsContainer = document.getElementById("details-container");

const tabMessages = {
  all: "All items are shown here.",
  starred: "Starred items are shown here.",
  deleted: "Recently deleted items are shown here.",
};

function renderDispatchInfo(tabType = "all") {
  content.innerHTML = ""; // Clear previous content

  let filteredData = dispatchData.filter((item) => {
    if (tabType === "all") return true;
    if (tabType === "starred") return item.isPreferred;
    if (tabType === "deleted") return item.isDeleted;
    return false;
  });

  if (filteredData.length === 0) {
    content.innerHTML = `<p class="text-gray-500">${tabMessages[tabType]}</p>`;
    return;
  }

  filteredData.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add(
      "dispatch-info",
      "border",
      "rounded-lg",
      "p-4",
      "bg-white",
      "shadow-md",
      "mb-4"
    );

    div.innerHTML = `
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <strong class="text-lg text-blue-600">$${
          item.price?.total || "N/A"
        }</strong>
        <span class="text-gray-700 font-medium">${item.origin.city}, ${
      item.origin.state
    } → ${item.destination.city}, ${item.destination.state}</span>
        <p class="text-sm text-gray-500">Available: ${new Date(
          item.availableDate
        ).toLocaleDateString()}</p>
        <p class="text-sm text-gray-500">${item.distance} miles</p>
      </div>
  
      <div class="flex gap-4">
        <i class="fa-regular fa-star text-gray-400 cursor-pointer hover:text-yellow-500 transition-transform duration-300 transform hover:scale-125 ${
          item.isPreferred ? "text-yellow-500" : ""
        }" data-index="${index}"></i>
        <i class="fa-solid fa-trash-can text-gray-600 cursor-pointer hover:text-red-500" data-index="${index}"></i>
        <i class="fa-solid fa-chevron-down expand-icon cursor-pointer text-gray-600 hover:text-blue-500 transition" data-index="${index}"></i>
      </div>
    </div>
  
    <!-- Expanded Details (Dynamically Generated) -->
    <div id="details-${index}" class="hidden lg:hidden bg-gray-100 p-5 mt-3 rounded-lg shadow-lg">
      <div class="w-full flex flex-col lg:flex-row gap-5">
        <div class="flex-1 bg-white p-5 rounded-lg shadow-md">
          <div class="flex items-center justify-center gap-5">
            <div class="text-center">
              <strong class="text-blue-600 text-4xl lg:text-6xl">${
                item.origin.state
              }</strong>
              <p>${item.origin.city}</p>
            </div>
            <span class="text-blue-600 text-4xl lg:text-6xl">➝</span>
            <div class="text-center">
              <strong class="text-blue-600 text-4xl lg:text-6xl">${
                item.destination.state
              }</strong>
              <p>${item.destination.city}</p>
            </div>
          </div>
        </div>
  
        <div class="w-full flex flex-wrap lg:flex-nowrap bg-blue-600 rounded-lg shadow-md overflow-hidden">
          <div class="flex-1 py-4 text-center border-r border-white">
            <p class="text-gray-300 font-bold">Rate</p>
            <span class="text-white text-xl lg:text-3xl font-bold">$${
              item.price?.total || "N/A"
            }</span>
          </div>
          <div class="flex-1 py-4 text-center border-r border-white">
            <p class="text-gray-300 font-bold">Miles</p>
            <span class="text-white text-xl lg:text-3xl font-bold">${
              item.distance
            } miles</span>
          </div>
          <div class="flex-1 py-4 text-center">
            <p class="text-gray-300 font-bold">RPM</p>
            <span class="text-white text-xl lg:text-3xl font-bold">$${
              (item.price?.total / item.distance).toFixed(2) || "N/A"
            }</span>
          </div>
        </div>
      </div>
  
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Name:</h4>
          <span>${item.shipper?.name || "Unknown"}</span>
  
          <h4 class="text-gray-400 mt-3">Order ID:</h4>
          <span>${item.orderId || "N/A"}</span>
  
          <h4 class="text-gray-400 mt-3">Distance:</h4>
          <span>${item.distance} miles</span>
  
          <h4 class="text-gray-400 mt-3">Vehicle Count:</h4>
          <span>${item.vehicleCount || 1}</span>
        </div>
  
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Origin:</h4>
          <span>${item.origin.city}, ${item.origin.state}</span>
  
          <h4 class="text-gray-400 mt-3">Destination:</h4>
          <span>${item.destination.city}, ${item.destination.state}</span>
  
          <h4 class="text-gray-400 mt-3">Shipper:</h4>
          <span>${item.shipper?.company || "Unknown"}</span>
        </div>
  
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Total Pay:</h4>
          <span>$${item.price?.total || "N/A"}</span>
  
          <h4 class="text-gray-400 mt-3">Rate/Mile:</h4>
          <span>$${
            (item.price?.total / item.distance).toFixed(2) || "N/A"
          }</span>
  
          <h4 class="text-gray-400 mt-3">Phone:</h4>
          <span>${item.shipper?.phone || "N/A"}</span>
        </div>
      </div>
  
      <div class="w-full mt-10 bg-gray-50 p-5 rounded-lg shadow-md">
        <h4 class="text-blue-600 border-b border-gray-300 pb-2">Comments</h4>
        <p class="mt-2 text-gray-700">${
          item.comments || "No comments available."
        }</p>
  
        <h4 class="text-blue-600 border-b border-gray-300 pb-2 mt-5">Notes</h4>
        <p class="mt-2 text-gray-700">${
          item.notes || "No additional notes."
        }</p>
      </div>
    </div>
  `;

    // **Click Event: Show Details on Right-Side Panel**
    div.addEventListener("click", () => {
      if (window.innerWidth >= 1024) {
        // lg and above
        detailsContainer.innerHTML = `
    <div class="max-w-[400px] mx-auto bg-white justify-center items-center flex py-5">
      <div class="flex items-center gap-10">
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-blue-600 text-6xl">${
            item.origin.state || "N/A"
          }</strong>
          <p>${item.origin.city || "Unknown"}</p>
        </div>
        <span class="text-blue-600 text-6xl">➝</span>
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-blue-600 text-6xl">${
            item.destination.state || "N/A"
          }</strong>
          <p>${item.destination.city || "Unknown"}</p>
        </div>
      </div>
    </div>

    <div class="w-full flex min-h-[134px] rounded-lg">
      <div class="bg-blue-600 flex-1 flex flex-col justify-center py-4 border-r border-white text-center rounded-l-lg">
        <p class="text-gray-300 font-normal">Rate</p>
        <span class="text-white text-3xl font-bold">$${
          item.price?.total || "N/A"
        }</span>
      </div>
      <div class="bg-blue-600 flex-1 flex flex-col justify-center py-4 border-r border-white text-center">
        <p class="text-gray-300 font-normal">Miles</p>
        <span class="text-white text-3xl font-bold">${
          item.distance || "N/A"
        } miles</span>
      </div>
      <div class="bg-blue-600 flex-1 flex flex-col justify-center py-4 text-center rounded-r-lg">
        <p class="text-gray-300 font-normal">RPM</p>
        <span class="text-white text-3xl font-bold">$${
          (item.price?.total / item.distance).toFixed(2) || "N/A"
        }</span>
      </div>
    </div>


    <div class="w-full flex gap-4 p-3">
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Name:</h4> <span>${
            item.shipper?.name || "Unknown"
          }</span>
          <h4 class="text-gray-400">Order ID:</h4> <span>${
            item.orderId || "N/A"
          }</span>
          <h4 class="text-gray-400">Distance:</h4> <span>${
            item.distance || "N/A"
          } miles</span>
          <h4 class="text-gray-400">Vehicle Count:</h4> <span>${
            item.vehicleCount || "1"
          }</span>
          <h4 class="text-gray-400">Pick-up Date:</h4> <span>${new Date(
            item.availableDate
          ).toLocaleDateString()}</span>
          <h4 class="text-gray-400">Pay Terms:</h4> <span>${
            item.payTerms || "N/A"
          }</span>
        </div>
      </div>

      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Origin:</h4> <span>${item.origin.city}, ${
          item.origin.state
        }</span>
          <h4 class="text-gray-400">Destination:</h4> <span>${
            item.destination.city
          }, ${item.destination.state}</span>
          <h4 class="text-gray-400">Shipper:</h4> <span>${
            item.shipper?.company || "Unknown"
          }</span>
          <h4 class="text-gray-400">Max Weight:</h4> <span>${
            item.maxWeight || "N/A"
          }</span>
          <h4 class="text-gray-400">Delivery Date:</h4> <span>${
            item.deliveryDate || "N/A"
          }</span>
        </div>
      </div>

      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Age:</h4> <span>${item.age || "N/A"}</span>
          <h4 class="text-gray-400">Total Pay:</h4> <span>$${
            item.price?.total || "N/A"
          }</span>
          <h4 class="text-gray-400">Rate/mile:</h4> <span>$${
            (item.price?.total / item.distance).toFixed(2) || "N/A"
          }</span>
          <h4 class="text-gray-400">Phone:</h4> <span>${
            item.shipper?.phone || "N/A"
          }</span>
          <h4 class="text-gray-400">Tier Group:</h4> <span>${
            item.tierGroup || "N/A"
          }</span>
          <h4 class="text-gray-400">Old Rating:</h4> <span>${
            item.oldRating || "N/A"
          }</span>
          <h4 class="text-gray-400">Pay Method:</h4> <span>${
            item.payMethod || "N/A"
          }</span>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-blue-600">Comments</div>
      <p class="mt-2 text-gray-700">${
        item.comments || "No comments available."
      }</p>
    </div>

    <!-- Notes Section -->
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-blue-600">Notes</div>
      <p class="mt-2 text-gray-700">${item.notes || "No additional notes."}</p>
  </div>
      `;
        detailsContainer.classList.remove("hidden");
      }
    });

    // Expand icon functionality
    const expandIcons = div.querySelectorAll(".expand-icon");

    expandIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const detailsDiv = document.getElementById(`details-${index}`);

        if (window.innerWidth >= 1024) {
          // Move details to the right-side panel on lg+
          const detailsContainer = document.getElementById("details-container");
          detailsContainer.innerHTML = detailsDiv.innerHTML;
          detailsContainer.classList.remove("hidden");
        } else {
          // Default behavior for smaller screens (toggle visibility)
          const isHidden = detailsDiv.classList.contains("hidden");

          document.querySelectorAll("[id^=details-]").forEach((el) => {
            el.classList.add("hidden");
            el.previousElementSibling
              .querySelector(".expand-icon")
              ?.classList.remove("fa-chevron-up");
            el.previousElementSibling
              .querySelector(".expand-icon")
              ?.classList.add("fa-chevron-down");
          });

          if (isHidden) {
            detailsDiv.classList.remove("hidden");
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else {
            detailsDiv.classList.add("hidden");
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        }
      });
    });

    // Favorite (star) functionality
    div.querySelector(".fa-star").addEventListener("click", (e) => {
      e.stopPropagation();
      item.isPreferred = !item.isPreferred;
      renderDispatchInfo(tabType);
    });

    // Delete functionality
    div.querySelector(".fa-trash-can").addEventListener("click", (e) => {
      e.stopPropagation();
      item.isDeleted = true;
      renderDispatchInfo(tabType);
    });

    content.appendChild(div);
  });
}

// Initialize the tabs
window.addEventListener("load", () => {
  document.querySelector('[data-tab="all"]').click();
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

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");

  menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
  });

  // Hide menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!menuButton.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.add("hidden");
    }
  });

  // Handle "Delete All" click
  document.getElementById("delete-all").addEventListener("click", function () {
    alert("Delete All clicked!");
    menu.classList.add("hidden");
  });
});
