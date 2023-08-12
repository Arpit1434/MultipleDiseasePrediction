const diabetesForm = document.getElementById("diabetes-form");

diabetesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(diabetesForm);
  const diabetesPrediction = document.getElementById("diabetes-prediction");
  diabetesPrediction.scrollIntoView({ behavior: "smooth" });
  diabetesPrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
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
  diabetesPrediction.scrollIntoView({ behavior: "smooth" });
});

const randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", async () => {
  const diabetesPrediction = document.getElementById("diabetes-prediction");
  diabetesPrediction.scrollIntoView({ behavior: "smooth" });
  diabetesPrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  try {
    const response = await fetch("/diabetes/random");
    if (response.ok) {
      const data = await response.json();
      diabetesForm["Pregnancies"].value = data["Pregnancies"];
      diabetesForm["Glucose"].value = data["Glucose"];
      diabetesForm["BloodPressure"].value = data["BloodPressure"];
      diabetesForm["SkinThickness"].value = data["SkinThickness"];
      diabetesForm["Insulin"].value = data["Insulin"];
      diabetesForm["BMI"].value = data["BMI"];
      diabetesForm["DiabetesPedigreeFunction"].value = data["DiabetesPedigreeFunction"];
      diabetesForm["Age"].value = data["Age"];
      const outcome = data["Outcome"];
      const formData = new FormData(diabetesForm);
      const formResponse = await fetch("/diabetes/predict", {
        method: "POST",
        body: formData,
      });
      if (formResponse.ok) {
        const formResponseData = await formResponse.json();
        let html = `
      <div class="card text-bg-${formResponseData.status} mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Actual Result: ${
        outcome ? "Has Diabetes" : "Does not have Diabetes"
      }</h5>
      <p class="card-text">Prediction</p>
      <p class="card-text">
      ${formResponseData.message}
      </p>
    </div>
  </div>
      `;
        diabetesPrediction.innerHTML = html;
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
    diabetesPrediction.innerHTML = html;
  }
  diabetesPrediction.scrollIntoView({ behavior: "smooth" });
});
