import { dispatchData } from "./dispatchData.js";

// --- DOM Elements & Constants ---
const tabs = document.querySelectorAll("[data-tab]");
const content = document.getElementById("tab-content");
const detailsContainer = document.getElementById("details-container");

const tabMessages = {
  all: "All items are shown here.",
  starred: "Starred items are shown here.",
  deleted: "Recently deleted items are shown here.",
};

const allCountSpan = document.querySelector('[data-tab="all"] span');
const starredCountSpan = document.querySelector('[data-tab="starred"] span');

// --- Update Counts ---
function updateCounts() {
  const allCount = dispatchData.length;
  const starredCount = dispatchData.filter((item) => item.isPreferred).length;
  allCountSpan.textContent = allCount;
  starredCountSpan.textContent = starredCount;
}
updateCounts();

// --- Template Functions ---
// Returns the HTML for a "central" dispatch card (summary and mobile details)
function getCentralCardHTML(item, index) {
  return `
    <div class="flex justify-between items-end">
      <div class="h-full flex flex-col gap-1">
       <p class="text-sm text-gray-500 font-semibold">${item.name}</p>
        <div class="flex items-center gap-3">
          <strong class="text-lg text-[#ff841c]">$${
            item.price?.total || "N/A"
          }</strong>
          -
          <p class="font-semibold text-sm">$${(
            item.price?.total / item.distance
          ).toFixed(2)}</p>
        </div>
          <span class="text-gray-700 text-sm font-medium">
          ${item.origin.city}, ${item.origin.state} → ${
    item.destination.city
  }, ${item.destination.state} (${item.distance} miles)
        </span>

      </div>
      <div class="flex flex-col items-center h-full">
      <div class="flex items-center gap-2">
        <a   href=${`http://www.google.com/maps/dir/${item.origin.geoCode.latitude},${item.origin.geoCode.longitude}/${item.destination.geoCode.latitude},${item.destination.geoCode.longitude}/`} target="_blank" class="mb-4">
          <img src="./assets/map.webp" alt="map img" class="w-4 h-4 object-cover hover:scale-125 transition">
        </a>
        <a   href=${`http://www.google.com/maps/dir/${item.origin.geoCode.latitude},${item.origin.geoCode.longitude}/${item.destination.geoCode.latitude},${item.destination.geoCode.longitude}/`} target="_blank" class="mb-4">
          <img src="./assets/open-new.png" alt="open new" class="w-4 h-4 object-cover hover:scale-125 transition">
        </a>
      </div>
        <div class="mb-5 w-[64px] text-center py-1 bg-[#ff841c] rounded-md text-xs text-white">${
          item.website
        }</div>
          <div class="flex gap-4">
          <i class="fa-regular fa-star text-gray-400 cursor-pointer hover:text-yellow-500 transition-transform duration-300 transform hover:scale-125 ${
            item.isPreferred ? "text-yellow-500" : ""
          }" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can text-gray-600 cursor-pointer hover:text-red-500" data-index="${index}"></i>
          <i class="fa-solid fa-chevron-down expand-icon cursor-pointer text-gray-600 hover:text-blue-500 transition" data-index="${index}"></i>
          </div>
        </div>
      </div>
    <!-- Mobile Expanded Details -->
    <div id="details-${index}" class="hidden lg:hidden bg-gray-100 p-5 mt-3 rounded-lg shadow-lg">
      <div class="w-full flex flex-col lg:flex-row gap-5">
        <div class="flex-1 bg-white p-5 rounded-lg shadow-md">
          <div class="flex items-center justify-center gap-5">
            <div class="text-center">
              <strong class="text-[#ff841c] text-4xl lg:text-6xl">${
                item.origin.state
              }</strong>
              <p>${item.origin.city}</p>
            </div>
            <span class="text-[#ff841c] text-4xl lg:text-6xl">➝</span>
            <div class="text-center">
              <strong class="text-[#ff841c] text-4xl lg:text-6xl">${
                item.destination.state
              }</strong>
              <p>${item.destination.city}</p>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-wrap lg:flex-nowrap bg-[#ff841c] rounded-lg shadow-md overflow-hidden">
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
          <span>${item.name || "Unknown"}</span>
          <h4 class="text-gray-400 mt-3">Order ID:</h4>
          <span>${item.shipperOrderId || "N/A"}</span>
          <h4 class="text-gray-400 mt-3">Distance:</h4>
          <span>${item.distance} miles</span>
          <h4 class="text-gray-400 mt-3">Vehicle Count:</h4>
          <span>${item.vehicles?.length || 1}</span>
        </div>
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Origin:</h4>
          <span>${item.origin.city}, ${item.origin.state}</span>
          <h4 class="text-gray-400 mt-3">Destination:</h4>
          <span>${item.destination.city}, ${item.destination.state}</span>
          <h4 class="text-gray-400 mt-3">Shipper:</h4>
          <span>${item.shipper?.companyName || "Unknown"}</span>
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
        <h4 class="text-[#ff841c] border-b border-gray-300 pb-2">Additional Info</h4>
        <p class="mt-2 text-gray-700">${
          item.additionalInfo || "No additional information."
        }</p>
        <h4 class="text-[#ff841c] border-b border-gray-300 pb-2 mt-5">Pre-Dispatch Notes</h4>
        <p class="mt-2 text-gray-700">${
          item.preDispatchNotes || "No pre-dispatch notes."
        }</p>
      </div>
    </div>
  `;
}

// Returns the HTML for a "carsarrive" dispatch card (summary and mobile details)
function getCarsArriveCardHTML(item, index) {
  return `
    <div class="flex justify-between items-end">
      <div class="flex flex-col gap-1">

        <p class="text-sm text-gray-500 font-semibold">${item.name}</p>
        <div class="flex items-center gap-3">
          <strong class="text-lg text-[#b9181b]">${
            item.pricePerShipment || "N/A"
          }</strong>
          -
          <p class="font-semibold text-sm">${item.pricePerMile || "N/A"}</p>
        </div>
        <span class="text-gray-700 text-sm font-medium">
          ${item.originCity}, ${item.originState} → ${item.destinationCity}, ${
    item.destinationState
  } (${item.mileage} miles)
        </span>
      </div>
     <div class="flex flex-col items-center h-full">
        <div class="flex items-center gap-2">
          <a href=${`http://www.google.com/maps/dir/${encodeURIComponent(
            item.originCity
          )}%20${encodeURIComponent(item.originState)}/${encodeURIComponent(
            item.destinationCity
          )}%20${encodeURIComponent(item.destinationState)}/`}
 target="_blank" class="mb-4">
            <img src="./assets/map.webp" alt="map img" class="w-4 h-4 object-cover hover:scale-125 transition">
          </a>
          <a  href=${`http://www.google.com/maps/dir/${encodeURIComponent(
            item.originCity
          )}%20${encodeURIComponent(item.originState)}/${encodeURIComponent(
            item.destinationCity
          )}%20${encodeURIComponent(
            item.destinationState
          )}/`}target="_blank" class="mb-4">
            <img src="./assets/open-new.png" alt="open new" class="w-4 h-4 object-cover hover:scale-125 transition">
          </a>
        </div>
        <div class="mb-5 w-[64px] py-1 bg-[#b9181b] text-center rounded-md text-xs text-white">${
          item.website
        }</div>
          <div class="flex gap-4">
          <i class="fa-regular fa-star text-gray-400 cursor-pointer hover:text-yellow-500 transition-transform duration-300 transform hover:scale-125 ${
            item.isPreferred ? "text-yellow-500" : ""
          }" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can text-gray-600 cursor-pointer hover:text-red-500" data-index="${index}"></i>
          <i class="fa-solid fa-chevron-down expand-icon cursor-pointer text-gray-600 hover:text-blue-500 transition" data-index="${index}"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Expanded Details -->
    <div id="details-${index}" class="hidden lg:hidden bg-gray-100 p-5 mt-3 rounded-lg shadow-lg">
      <div class="w-full flex flex-col lg:flex-row gap-5">
        <div class="flex-1 bg-white p-5 rounded-lg shadow-md">
          <div class="flex items-center justify-center gap-5">
            <div class="text-center">
              <strong class="text-[#b9181b] text-4xl lg:text-6xl">${
                item.originState
              }</strong>
              <p>${item.originCity}</p>
            </div>
            <span class="text-[#b9181b] text-4xl lg:text-6xl">➝</span>
            <div class="text-center">
              <strong class="text-[#b9181b] text-4xl lg:text-6xl">${
                item.destinationState
              }</strong>
              <p>${item.destinationCity}</p>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-wrap lg:flex-nowrap bg-[#b9181b] rounded-lg shadow-md overflow-hidden">
          <div class="flex-1 py-4 text-center border-r border-white">
            <p class="text-gray-300 font-bold">Rate</p>
            <span class="text-white text-xl lg:text-3xl font-bold">${
              item.pricePerShipment || "N/A"
            }</span>
          </div>
          <div class="flex-1 py-4 text-center border-r border-white">
            <p class="text-gray-300 font-bold">Miles</p>
            <span class="text-white text-xl lg:text-3xl font-bold">${
              item.mileage
            } miles</span>
          </div>
          <div class="flex-1 py-4 text-center">
            <p class="text-gray-300 font-bold">Price/Mile</p>
            <span class="text-white text-xl lg:text-3xl font-bold">${
              item.pricePerMile || "N/A"
            }</span>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Name:</h4>
          <span>${item.name || "Unknown"}</span>
          <h4 class="text-gray-400 mt-3">Load ID:</h4>
          <span>${item.id || "N/A"}</span>
          <h4 class="text-gray-400 mt-3">Distance:</h4>
          <span>${item.mileage} miles</span>
          <h4 class="text-gray-400 mt-3">Vehicle Count:</h4>
          <span>${item.numberOfCars || "1"}</span>
        </div>
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Origin:</h4>
          <span>${item.originCity}, ${item.originState}</span>
          <h4 class="text-gray-400 mt-3">Destination:</h4>
          <span>${item.destinationCity}, ${item.destinationState}</span>
          <h4 class="text-gray-400 mt-3">Vehicle:</h4>
          <span>${item.yearMakeModel || "N/A"}</span>
        </div>
        <div class="bg-white p-5 rounded-lg shadow-md">
          <h4 class="text-gray-400">Total Pay:</h4>
          <span>${item.pricePerShipment || "N/A"}</span>
          <h4 class="text-gray-400 mt-3">Rate/Mile:</h4>
          <span>${item.pricePerMile || "N/A"}</span>
        </div>
      </div>
      <div class="w-full mt-10 bg-gray-50 p-5 rounded-lg shadow-md">
        <h4 class="text-[#b9181b] border-b border-gray-300 pb-2">Comments</h4>
        <p class="mt-2 text-gray-700">${
          item.comments || "No comments available."
        }</p>
        <h4 class="text-[#b9181b] border-b border-gray-300 pb-2 mt-5">Website</h4>
        <p class="mt-2 text-gray-700">${
          item.website || "No website available."
        }</p>
      </div>
    </div>
  `;
}

// Desktop details templates (displayed in the right-side panel on larger screens)
function getCentralDesktopDetailsHTML(item) {
  return `
    <div class="max-w-[400px] mx-auto bg-white flex py-5 justify-center items-center">
      <div class="flex items-center gap-10">
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-[#ff841c] text-6xl">${
            item.origin.state || "N/A"
          }</strong>
          <p>${item.origin.city || "Unknown"}</p>
        </div>
        <span class="text-[#ff841c] text-6xl">➝</span>
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-[#ff841c] text-6xl">${
            item.destination.state || "N/A"
          }</strong>
          <p>${item.destination.city || "Unknown"}</p>
        </div>
      </div>
    </div>
    <div class="w-full flex min-h-[114px] rounded-lg">
      <div class="bg-[#ff841c] flex-1 flex flex-col justify-center py-4 border-r border-white text-center rounded-l-lg">
        <p class="text-black">Rate</p>
        <span class="text-white text-3xl font-bold">$${
          item.price.total || "N/A"
        }</span>
      </div>
      <div class="bg-[#ff841c] flex-1 flex flex-col justify-center py-4 border-r border-white text-center">
        <p class="text-black">Miles</p>
        <span class="text-white text-3xl font-bold">${
          item.distance || "N/A"
        } miles</span>
      </div>
      <div class="bg-[#ff841c] flex-1 flex flex-col justify-center py-4 text-center rounded-r-lg">
        <p class="text-black">RPM</p>
        <span class="text-white text-3xl font-bold">${
          item.price.total && item.distance
            ? (item.price.total / item.distance).toFixed(2)
            : "N/A"
        }</span>
      </div>
    </div>
    <div class="w-full flex gap-4 p-3">
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Name:</h4>
          <span>${item.name || "Unknown"}</span>
          <h4 class="text-gray-400">Order ID:</h4>
          <span>${item.id || "N/A"}</span>
          <h4 class="text-gray-400">Distance:</h4>
          <span>${item.distance || "N/A"} miles</span>
          <h4 class="text-gray-400">Vehicle Count:</h4>
          <span>${item.vehicles.length || "1"}</span>
          <h4 class="text-gray-400">Pick-up Date:</h4>
          <span>${
            item.availableDate
              ? new Date(item.availableDate).toLocaleDateString()
              : "N/A"
          }</span>
          <h4 class="text-gray-400">Pay Terms:</h4>
          <span>${item.price.balance.balancePaymentTermsBeginOn || "N/A"}</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Origin:</h4>
          <span>${item.origin.city}, ${item.origin.state}</span>
          <h4 class="text-gray-400">Destination:</h4>
          <span>${item.destination.city}, ${item.destination.state}</span>
          <h4 class="text-gray-400">Shipper:</h4>
          <span>${item.shipper.companyName || "Unknown"}</span>
          <h4 class="text-gray-400">Trailer Type:</h4>
          <span>${item.trailerType || "N/A"}</span>
          <h4 class="text-gray-400">Delivery Date:</h4>
          <span>${
            item.expirationDate
              ? new Date(item.expirationDate).toLocaleDateString()
              : "N/A"
          }</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Total Pay:</h4>
          <span>$${item.price.total || "N/A"}</span>
          <h4 class="text-gray-400">Rate/mile:</h4>
          <span>$${
            (item.price.total / item.distance).toFixed(2) || "N/A"
          }</span>
          <h4 class="text-gray-400">Phone:</h4>
          <span>${item.shipper.phone || "N/A"}</span>
          <h4 class="text-gray-400">Tier Group:</h4>
          <span>${item.shipper.tierGroup || "N/A"}</span>
          <h4 class="text-gray-400">Shipper Rating:</h4>
          <span>${item.shipper.rating || "N/A"}%</span>
          <h4 class="text-gray-400">Pay Method:</h4>
          <span>${item.price.balance.balancePaymentMethod || "N/A"}</span>
        </div>
      </div>
    </div>
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-[#ff841c]">Vehicle Details</div>
      ${item.vehicles
        .map(
          (vehicle) => `
            <p class="mt-2 text-gray-700">
              ${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.vehicleType} (${vehicle.qty}x)
            </p>
          `
        )
        .join("")}
    </div>
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-[#ff841c]">Additional Info</div>
      <p class="mt-2 text-gray-700">${
        item.additionalInfo || "No additional info."
      }</p>
    </div>
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-[#913b8e]">Notes</div>
      <p class="mt-2 text-gray-700">${
        item.preDispatchNotes || "No additional notes."
      }</p>
    </div>
  `;
}

function getCarsArriveDesktopDetailsHTML(item) {
  return `
    <div class="max-w-[400px] mx-auto bg-white flex py-5 justify-center items-center">
      <div class="flex items-center gap-10">
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-[#b9181b] text-6xl">${
            item.originState || "N/A"
          }</strong>
          <p>${item.originCity || "Unknown"}</p>
        </div>
        <span class="text-[#b9181b] text-6xl">➝</span>
        <div class="flex flex-col gap-1 text-center">
          <strong class="text-[#b9181b] text-6xl">${
            item.destinationState || "N/A"
          }</strong>
          <p>${item.destinationCity || "Unknown"}</p>
        </div>
      </div>
    </div>
    <div class="w-full flex min-h-[114px] rounded-lg">
      <div class="bg-[#b9181b] flex-1 flex flex-col justify-center py-4 border-r border-white text-center rounded-l-lg">
        <p class="text-black">Rate</p>
        <span class="text-white text-3xl font-bold">${
          item.pricePerShipment || "N/A"
        }</span>
      </div>
      <div class="bg-[#b9181b] flex-1 flex flex-col justify-center py-4 border-r border-white text-center">
        <p class="text-black">Miles</p>
        <span class="text-white text-3xl font-bold">${
          item.mileage || "N/A"
        } miles</span>
      </div>
      <div class="bg-[#b9181b] flex-1 flex flex-col justify-center py-4 text-center rounded-r-lg">
        <p class="text-black">RPM</p>
        <span class="text-white text-3xl font-bold">${
          item.mileage && item.pricePerShipment
            ? (
                parseFloat(item.pricePerShipment.replace("$", "")) /
                parseFloat(item.mileage)
              ).toFixed(2)
            : "N/A"
        }</span>
      </div>
    </div>
    <div class="w-full flex gap-4 p-3">
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Name:</h4>
          <span>${item.name || "Unknown"}</span>
          <h4 class="text-gray-400">Order ID:</h4>
          <span>${item.id || "N/A"}</span>
          <h4 class="text-gray-400">Distance:</h4>
          <span>${item.mileage || "N/A"} miles</span>
          <h4 class="text-gray-400">Vehicle Count:</h4>
          <span>${item.numberOfCars || "1"}</span>
          <h4 class="text-gray-400">Pick-up Date:</h4>
          <span>${
            item.createdDate
              ? new Date(item.createdDate).toLocaleDateString()
              : "N/A"
          }</span>
          <h4 class="text-gray-400">Pay Terms:</h4>
          <span>N/A</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Origin:</h4>
          <span>${item.originCity}, ${item.originState}</span>
          <h4 class="text-gray-400">Destination:</h4>
          <span>${item.destinationCity}, ${item.destinationState}</span>
          <h4 class="text-gray-400">Shipper:</h4>
          <span>${item.website || "Unknown"}</span>
          <h4 class="text-gray-400">Max Weight:</h4>
          <span>N/A</span>
          <h4 class="text-gray-400">Delivery Date:</h4>
          <span>N/A</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-2">
          <h4 class="text-gray-400">Age:</h4>
          <span>N/A</span>
          <h4 class="text-gray-400">Total Pay:</h4>
          <span>${item.pricePerShipment || "N/A"}</span>
          <h4 class="text-gray-400">Rate/mile:</h4>
          <span>${item.pricePerMile || "N/A"}</span>
          <h4 class="text-gray-400">Phone:</h4>
          <span>N/A</span>
          <h4 class="text-gray-400">Tier Group:</h4>
          <span>N/A</span>
          <h4 class="text-gray-400">Old Rating:</h4>
          <span>N/A</span>
          <h4 class="text-gray-400">Pay Method:</h4>
          <span>N/A</span>
        </div>
      </div>
    </div>
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-[#b9181b]">Comments</div>
      <p class="mt-2 text-gray-700">${
        item.comments || "No comments available."
      }</p>
    </div>
    <div class="w-full mt-10 gap-4 p-3">
      <div class="w-full border-b border-gray-400 text-[#b9181b]">Notes</div>
      <p class="mt-2 text-gray-700">No additional notes.</p>
    </div>
  `;
}

// --- Details Rendering ---
// On desktop (window.innerWidth >= 1024) show details in the right panel.
function showDetailsDesktop(item) {
  if (window.innerWidth < 1024) return;
  if (item.website === "central") {
    detailsContainer.innerHTML = getCentralDesktopDetailsHTML(item);
  } else if (item.website === "carsarrive") {
    detailsContainer.innerHTML = getCarsArriveDesktopDetailsHTML(item);
  }
  detailsContainer.classList.remove("hidden");
}

// --- Event Listener Helpers ---
// Toggle mobile details (or update the right-side panel on desktop) when an expand icon is clicked.
function attachExpandIconListeners(card, index, item) {
  const expandIcons = card.querySelectorAll(".expand-icon");
  expandIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.stopPropagation();
      const detailsDiv = document.getElementById(`details-${index}`);
      if (window.innerWidth >= 1024) {
        detailsContainer.innerHTML = detailsDiv.innerHTML;
        detailsContainer.classList.remove("hidden");
      } else {
        // Collapse all details first
        document.querySelectorAll("[id^='details-']").forEach((el) => {
          el.classList.add("hidden");
          const iconEl =
            el.previousElementSibling.querySelector(".expand-icon");
          if (iconEl) {
            iconEl.classList.remove("fa-chevron-up");
            iconEl.classList.add("fa-chevron-down");
          }
        });
        // Toggle current details
        if (detailsDiv.classList.contains("hidden")) {
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
}

// Toggle favorite status and re-render the current tab.
function attachFavoriteListener(card, item, tabType) {
  const starIcon = card.querySelector(".fa-star");
  if (starIcon) {
    starIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      item.isPreferred = !item.isPreferred;
      renderDispatchInfo(tabType);
    });
  }
}

// Mark item as deleted and re-render.
function attachDeleteListener(card, item, tabType) {
  const deleteIcon = card.querySelector(".fa-trash-can");
  if (deleteIcon) {
    deleteIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      item.isDeleted = true;
      renderDispatchInfo(tabType);
    });
  }
}

// --- Card Factory ---
// Creates a dispatch card element (with proper HTML and event listeners)
function createDispatchCard(item, index, tabType) {
  const card = document.createElement("div");
  card.className = "dispatch-info border rounded-lg p-4 bg-white mb-2";
  card.innerHTML =
    item.website === "central"
      ? getCentralCardHTML(item, index)
      : getCarsArriveCardHTML(item, index);

  // On card click, update the right panel (desktop view)
  card.addEventListener("click", () => {
    showDetailsDesktop(item);
  });

  attachExpandIconListeners(card, index, item);
  attachFavoriteListener(card, item, tabType);
  attachDeleteListener(card, item, tabType);

  return card;
}

// --- Main Render Function ---
// Clears the content area, filters the data by tab, creates cards, and updates counts.
function renderDispatchInfo(tabType = "all") {
  content.innerHTML = "";
  detailsContainer.innerHTML = "";

  const filteredData = dispatchData.filter((item) => {
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
    const card = createDispatchCard(item, index, tabType);
    content.appendChild(card);
    // On desktop, automatically display the first item's details
    if (index === 0 && window.innerWidth >= 1024) {
      showDetailsDesktop(item);
    }
  });

  updateCounts();
}

// --- Tab & Menu Initialization ---
// When the page loads, simulate a click on the "all" tab.
window.addEventListener("load", () => {
  document.querySelector('[data-tab="all"]').click();
});

// Tab click: update the active tab styling and re-render the dispatch info.
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

// --- Mobile Menu Functionality ---
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
