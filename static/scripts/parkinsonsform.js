const parkinsonsForm = document.getElementById("parkinsons-form");

parkinsonsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(parkinsonsForm);
  const parkinsonsPrediction = document.getElementById("parkinsons-prediction");
  try {
    const response = await fetch("/parkinsons/predict", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      let html = `
      <div class="card text-bg-${data.status} mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Prediction</h5>
      <p class="card-text">
      ${data.message}
      </p>
    </div>
  </div>
      `;
      parkinsonsPrediction.innerHTML = html;
    } else {
      let html = `
      <div class="card text-bg-danger mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Missing parameters</h5>
      <p class="card-text">
      Please fill all details and try again
      </p>
    </div>
  </div>
      `;
      parkinsonsPrediction.innerHTML = html;
    }
  } catch (err) {
    let html = `
      <div class="card text-bg-danger mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Error occured</h5>
      <p class="card-text">
      ${err.message}
      </p>
    </div>
  </div>
      `;
    parkinsonsPrediction.innerHTML = html;
  }
});
