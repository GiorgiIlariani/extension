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
  
      <div class="w-full flex min-h-[114px] rounded-lg">
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
            <h4 class="text-gray-400">Age:</h4> <span>${
              item.age || "N/A"
            }</span>
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
        <p class="mt-2 text-gray-700">${
          item.notes || "No additional notes."
        }</p>
    </div>
        `;
    detailsContainer.classList.remove("hidden");
  }
});
