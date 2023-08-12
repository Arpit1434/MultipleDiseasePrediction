const parkinsonsForm = document.getElementById("parkinsons-form");

parkinsonsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(parkinsonsForm);
  const parkinsonsPrediction = document.getElementById("parkinsons-prediction");
  parkinsonsPrediction.scrollIntoView({ behavior: "smooth" });
  parkinsonsPrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
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
  parkinsonsPrediction.scrollIntoView({ behavior: "smooth" });
});

const randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", async () => {
  const parkinsonsPrediction = document.getElementById("parkinsons-prediction");
  parkinsonsPrediction.scrollIntoView({ behavior: "smooth" });
  parkinsonsPrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  try {
    const response = await fetch("/parkinsons/random");
    if (response.ok) {
      const data = await response.json();
      parkinsonsForm["fo"].value = data["MDVP:Fo(Hz)"];
      parkinsonsForm["fhi"].value = data["MDVP:Fhi(Hz)"];
      parkinsonsForm["flo"].value = data["MDVP:Flo(Hz)"];
      parkinsonsForm["Jitter_percent"].value = data["MDVP:Jitter(%)"];
      parkinsonsForm["Jitter_Abs"].value = data["MDVP:Jitter(Abs)"];
      parkinsonsForm["RAP"].value = data["MDVP:RAP"];
      parkinsonsForm["PPQ"].value = data["MDVP:PPQ"];
      parkinsonsForm["DDP"].value = data["Jitter:DDP"];
      parkinsonsForm["Shimmer"].value = data["MDVP:Shimmer"];
      parkinsonsForm["Shimmer_dB"].value = data["MDVP:Shimmer(dB)"];
      parkinsonsForm["APQ3"].value = data["Shimmer:APQ3"];
      parkinsonsForm["APQ5"].value = data["Shimmer:APQ5"];
      parkinsonsForm["APQ"].value = data["MDVP:APQ"];
      parkinsonsForm["DDA"].value = data["Shimmer:DDA"];
      parkinsonsForm["NHR"].value = data["NHR"];
      parkinsonsForm["HNR"].value = data["HNR"];
      parkinsonsForm["RPDE"].value = data["RPDE"];
      parkinsonsForm["DFA"].value = data["DFA"];
      parkinsonsForm["spread1"].value = data["spread1"];
      parkinsonsForm["spread2"].value = data["spread2"];
      parkinsonsForm["D2"].value = data["D2"];
      parkinsonsForm["PPE"].value = data["PPE"];
      const status = data["status"];
      const formData = new FormData(parkinsonsForm);
      const formResponse = await fetch("/parkinsons/predict", {
        method: "POST",
        body: formData,
      });
      if (formResponse.ok) {
        const formResponseData = await formResponse.json();
        let html = `
      <div class="card text-bg-${formResponseData.status} mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Actual Result: ${
        status ? "Has Parkinson's" : "Does not have Parkinson's"
      }</h5>
      <p class="card-text">Prediction: ${formResponseData.message}
      </p>
    </div>
  </div>
      `;
        parkinsonsPrediction.innerHTML = html;
      }
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
  parkinsonsPrediction.scrollIntoView({ behavior: "smooth" });
});
