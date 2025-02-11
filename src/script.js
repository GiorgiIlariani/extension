import { dispatchData } from "./dispatchData.js";

const tabs = document.querySelectorAll("[data-tab]");
const content = document.getElementById("tab-content");
const detailsContainer = document.getElementById("details-container");

const tabMessages = {
  all: "All items are shown here.",
  starred: "Starred items are shown here.",
  deleted: "Recently deleted items are shown here.",
};

// Select the span elements
const allCountSpan = document.querySelector('[data-tab="all"] span');
const starredCountSpan = document.querySelector('[data-tab="starred"] span');

function updateCounts() {
  const allCount = dispatchData.length;
  const starredCount = dispatchData.filter((item) => item.isPreferred).length;

  allCountSpan.textContent = allCount;
  starredCountSpan.textContent = starredCount;
}

// Call this function to update the counts when the page loads
updateCounts();

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
    detailsContainer.innerHTML = ""; // Clear details if no data
    return;
  }

  let firstItemDisplayed = false;

  filteredData.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add(
      "dispatch-info",
      "border",
      "rounded-lg",
      "p-4",
      "bg-white",
      // "shadow-md",
      "mb-2"
    );

    // **Click Event: Show Details**
    showDispatchItems(item);

    div.addEventListener("click", () => {
      showDetails(item);
    });

    // Automatically display the first item on load
    if (!firstItemDisplayed && index === 0) {
      showDetails(item);
      firstItemDisplayed = true;
    }

    // show dispatch items
    function showDispatchItems(item) {
      if (item.website === "central") {
        div.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <div class="flex items-center gap-3">
              <strong class="text-lg text-[#913b8e]">$${
                item.price?.total || "N/A"
              }</strong>
              -
              <p class="font-semibold text-sm">$${(
                item.price?.total / item.distance
              ).toFixed(2)}</p>
            </div>
            <span class="text-gray-700 font-medium">${item.origin.city}, ${
          item.origin.state
        } → ${item.destination.city}, ${item.destination.state}</span>
            <p class="text-sm text-gray-500 font-semibold">${
              item.distance
            } miles</p>
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
                  <strong class="text-[#913b8e] text-4xl lg:text-6xl">${
                    item.origin.state
                  }</strong>
                  <p>${item.origin.city}</p>
                </div>
                <span class="text-[#913b8e] text-4xl lg:text-6xl">➝</span>
                <div class="text-center">
                  <strong class="text-[#913b8e] text-4xl lg:text-6xl">${
                    item.destination.state
                  }</strong>
                  <p>${item.destination.city}</p>
                </div>
              </div>
            </div>
  
            <div class="w-full flex flex-wrap lg:flex-nowrap bg-[#913b8e] rounded-lg shadow-md overflow-hidden">
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
            <h4 class="text-[#913b8e] border-b border-gray-300 pb-2">Additional Info</h4>
            <p class="mt-2 text-gray-700">${
              item.additionalInfo || "No additional information."
            }</p>
  
            <h4 class="text-[#913b8e] border-b border-gray-300 pb-2 mt-5">Pre-Dispatch Notes</h4>
            <p class="mt-2 text-gray-700">${
              item.preDispatchNotes || "No pre-dispatch notes."
            }</p>
          </div>
        </div>
      `;
      }

      if (item.website === "carsarrive") {
        div.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <div class="flex items-center gap-3">
              <strong class="text-lg text-[#b9181b]">${
                item.pricePerShipment || "N/A"
              }</strong>
              -
              <p class="font-semibold text-sm">${item.pricePerMile || "N/A"}</p>
            </div>
            <span class="text-gray-700 font-medium">${item.originCity}, ${
          item.originState
        } → ${item.destinationCity}, ${item.destinationState}</span>
            <p class="text-sm text-gray-500 font-semibold">${
              item.mileage
            } miles</p>
          </div>
      
          <div class="flex gap-4">
            <i class="fa-regular fa-star text-gray-400 cursor-pointer hover:text-yellow-500 transition-transform duration-300 transform hover:scale-125" data-index="${index}"></i>
            <i class="fa-solid fa-trash-can text-gray-600 cursor-pointer hover:text-red-500" data-index="${index}"></i>
            <i class="fa-solid fa-chevron-down expand-icon cursor-pointer text-gray-600 hover:text-blue-500 transition" data-index="${index}"></i>
          </div>
        </div>
      
        <!-- Expanded Details -->
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
    }

    // Function to show details
    function showDetails(item) {
      if (window.innerWidth >= 1024 && item.website === "central") {
        detailsContainer.innerHTML = `
        <div class="max-w-[400px] mx-auto bg-white justify-center items-center flex py-5">
          <div class="flex items-center gap-10">
            <div class="flex flex-col gap-1 text-center">
              <strong class="text-[#913b8e] text-6xl">${
                item.origin.state || "N/A"
              }</strong>
              <p>${item.origin.city || "Unknown"}</p>
            </div>
            <span class="text-[#913b8e] text-6xl">➝</span>
            <div class="flex flex-col gap-1 text-center">
              <strong class="text-[#913b8e] text-6xl">${
                item.destination.state || "N/A"
              }</strong>
              <p>${item.destination.city || "Unknown"}</p>
            </div>
          </div>
        </div>
      
        <div class="w-full flex min-h-[114px] rounded-lg">
          <div class="bg-[#913b8e] flex-1 flex flex-col justify-center py-4 border-r border-white text-center rounded-l-lg">
            <p class="text-gray-300 font-normal">Rate</p>
            <span class="text-white text-3xl font-bold">$${
              item.price.total || "N/A"
            }</span>
          </div>
          <div class="bg-[#913b8e] flex-1 flex flex-col justify-center py-4 border-r border-white text-center">
            <p class="text-gray-300 font-normal">Miles</p>
            <span class="text-white text-3xl font-bold">${
              item.distance || "N/A"
            } miles</span>
          </div>
          <div class="bg-[#913b8e] flex-1 flex flex-col justify-center py-4 text-center rounded-r-lg">
            <p class="text-gray-300 font-normal">RPM</p>
            <span class="text-white text-3xl font-bold">
              ${
                item.price.total && item.distance
                  ? `$${(item.price.total / item.distance).toFixed(2)}`
                  : "N/A"
              }
            </span>
          </div>
        </div>
      
        <div class="w-full flex gap-4 p-3">
          <div class="flex-1">
            <div class="flex flex-col gap-2">
              <h4 class="text-gray-400">Name:</h4> <span>${
                item.name || "Unknown"
              }</span>
              <h4 class="text-gray-400">Order ID:</h4> <span>${
                item.id || "N/A"
              }</span>
              <h4 class="text-gray-400">Distance:</h4> <span>${
                item.distance || "N/A"
              } miles</span>
              <h4 class="text-gray-400">Vehicle Count:</h4> <span>${
                item.vehicles.length || "1"
              }</span>
              <h4 class="text-gray-400">Pick-up Date:</h4> <span>${
                item.availableDate
                  ? new Date(item.availableDate).toLocaleDateString()
                  : "N/A"
              }</span>
              <h4 class="text-gray-400">Pay Terms:</h4> <span>${
                item.price.balance.balancePaymentTermsBeginOn || "N/A"
              }</span>
            </div>
          </div>
      
          <div class="flex-1">
            <div class="flex flex-col gap-2">
              <h4 class="text-gray-400">Origin:</h4> <span>${
                item.origin.city
              }, ${item.origin.state}</span>
              <h4 class="text-gray-400">Destination:</h4> <span>${
                item.destination.city
              }, ${item.destination.state}</span>
              <h4 class="text-gray-400">Shipper:</h4> <span>${
                item.shipper.companyName || "Unknown"
              }</span>
              <h4 class="text-gray-400">Trailer Type:</h4> <span>${
                item.trailerType || "N/A"
              }</span>
              <h4 class="text-gray-400">Delivery Date:</h4> <span>${
                item.expirationDate
                  ? new Date(item.expirationDate).toLocaleDateString()
                  : "N/A"
              }</span>
            </div>
          </div>
      
          <div class="flex-1">
            <div class="flex flex-col gap-2">
              <h4 class="text-gray-400">Total Pay:</h4> <span>$${
                item.price.total || "N/A"
              }</span>
              <h4 class="text-gray-400">Rate/mile:</h4> <span>$${
                (item.price.total / item.distance).toFixed(2) || "N/A"
              }</span>
              <h4 class="text-gray-400">Phone:</h4> <span>${
                item.shipper.phone || "N/A"
              }</span>
              <h4 class="text-gray-400">Tier Group:</h4> <span>${
                item.shipper.tierGroup || "N/A"
              }</span>
              <h4 class="text-gray-400">Shipper Rating:</h4> <span>${
                item.shipper.rating || "N/A"
              }%</span>
              <h4 class="text-gray-400">Pay Method:</h4> <span>${
                item.price.balance.balancePaymentMethod || "N/A"
              }</span>
            </div>
          </div>
        </div>
      
        <!-- Vehicle Details Section -->
        <div class="w-full mt-10 gap-4 p-3">
          <div class="w-full border-b border-gray-400 text-[#913b8e]">Vehicle Details</div>
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
      
        <!-- Additional Info Section -->
        <div class="w-full mt-10 gap-4 p-3">
          <div class="w-full border-b border-gray-400 text-[#913b8e]">Additional Info</div>
          <p class="mt-2 text-gray-700">${
            item.additionalInfo || "No additional info."
          }</p>
        </div>
      
        <!-- Notes Section -->
        <div class="w-full mt-10 gap-4 p-3">
          <div class="w-full border-b border-gray-400 text-[#913b8e]">Notes</div>
          <p class="mt-2 text-gray-700">${
            item.preDispatchNotes || "No additional notes."
          }</p>
        </div>
      `;
        detailsContainer.classList.remove("hidden");
      }

      if (window.innerWidth >= 1024 && item.website === "carsarrive") {
        detailsContainer.innerHTML = `
  <div class="max-w-[400px] mx-auto bg-white justify-center items-center flex py-5">
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
      <p class="text-gray-300 font-normal">Rate</p>
      <span class="text-white text-3xl font-bold">${
        item.pricePerShipment || "N/A"
      }</span>
    </div>
    <div class="bg-[#b9181b] flex-1 flex flex-col justify-center py-4 border-r border-white text-center">
      <p class="text-gray-300 font-normal">Miles</p>
      <span class="text-white text-3xl font-bold">${
        item.mileage || "N/A"
      } miles</span>
    </div>
    <div class="bg-[#b9181b] flex-1 flex flex-col justify-center py-4 text-center rounded-r-lg">
      <p class="text-gray-300 font-normal">RPM</p>
      <span class="text-white text-3xl font-bold">
        ${
          item.mileage && item.pricePerShipment
            ? `$${(
                parseFloat(item.pricePerShipment.replace("$", "")) /
                parseFloat(item.mileage)
              ).toFixed(2)}`
            : "N/A"
        }
      </span>
    </div>
  </div>

  <div class="w-full flex gap-4 p-3">
    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <h4 class="text-gray-400">Name:</h4> <span>${
          item.name || "Unknown"
        }</span>
        <h4 class="text-gray-400">Order ID:</h4> <span>${
          item.id || "N/A"
        }</span>
        <h4 class="text-gray-400">Distance:</h4> <span>${
          item.mileage || "N/A"
        } miles</span>
        <h4 class="text-gray-400">Vehicle Count:</h4> <span>${
          item.numberOfCars || "1"
        }</span>
        <h4 class="text-gray-400">Pick-up Date:</h4> <span>${
          item.createdDate
            ? new Date(item.createdDate).toLocaleDateString()
            : "N/A"
        }</span>
        <h4 class="text-gray-400">Pay Terms:</h4> <span>N/A</span>
      </div>
    </div>

    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <h4 class="text-gray-400">Origin:</h4> <span>${item.originCity}, ${
          item.originState
        }</span>
        <h4 class="text-gray-400">Destination:</h4> <span>${
          item.destinationCity
        }, ${item.destinationState}</span>
        <h4 class="text-gray-400">Shipper:</h4> <span>${
          item.website || "Unknown"
        }</span>
        <h4 class="text-gray-400">Max Weight:</h4> <span>N/A</span>
        <h4 class="text-gray-400">Delivery Date:</h4> <span>N/A</span>
      </div>
    </div>

    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <h4 class="text-gray-400">Age:</h4> <span>N/A</span>
        <h4 class="text-gray-400">Total Pay:</h4> <span>${
          item.pricePerShipment || "N/A"
        }</span>
        <h4 class="text-gray-400">Rate/mile:</h4> <span>${
          item.pricePerMile || "N/A"
        }</span>
        <h4 class="text-gray-400">Phone:</h4> <span>N/A</span>
        <h4 class="text-gray-400">Tier Group:</h4> <span>N/A</span>
        <h4 class="text-gray-400">Old Rating:</h4> <span>N/A</span>
        <h4 class="text-gray-400">Pay Method:</h4> <span>N/A</span>
      </div>
    </div>
  </div>

  <!-- Comments Section -->
  <div class="w-full mt-10 gap-4 p-3">
    <div class="w-full border-b border-gray-400 text-[#b9181b]">Comments</div>
    <p class="mt-2 text-gray-700">${
      item.comments || "No comments available."
    }</p>
  </div>

  <!-- Notes Section -->
  <div class="w-full mt-10 gap-4 p-3">
    <div class="w-full border-b border-gray-400 text-[#b9181b]">Notes</div>
    <p class="mt-2 text-gray-700">No additional notes.</p>
  </div>
      `;
        detailsContainer.classList.remove("hidden");
      }
    }

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
