const diabetesForm = document.getElementById("diabetes-form");

diabetesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(diabetesForm);
  const diabetesPrediction = document.getElementById("diabetes-prediction");
  try {
    const response = await fetch("/diabetes/predict", {
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
      diabetesPrediction.innerHTML = html;
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
      diabetesPrediction.innerHTML = html;
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
    diabetesPrediction.innerHTML = html;
  }
});
