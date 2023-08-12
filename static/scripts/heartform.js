const heartDiseaseForm = document.getElementById("heart-disease-form");

heartDiseaseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(heartDiseaseForm);
  const heartDiseasePrediction = document.getElementById(
    "heart-disease-prediction"
  );
  heartDiseasePrediction.scrollIntoView({ behavior: "smooth" });
  heartDiseasePrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  try {
    const response = await fetch("/heart/predict", {
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
      heartDiseasePrediction.innerHTML = html;
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
      heartDiseasePrediction.innerHTML = html;
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
    heartDiseasePrediction.innerHTML = html;
  }
  heartDiseasePrediction.scrollIntoView({ behavior: "smooth" });
});

const randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", async () => {
  const heartDiseasePrediction = document.getElementById("heart-disease-prediction");
  heartDiseasePrediction.scrollIntoView({ behavior: "smooth" });
  heartDiseasePrediction.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  try {
    const response = await fetch("/heart/random");
    if (response.ok) {
      const data = await response.json();
      heartDiseaseForm["age"].value = data["age"];
      heartDiseaseForm["sex"].value = data["sex"];
      heartDiseaseForm["cp"].value = data["cp"];
      heartDiseaseForm["trestbps"].value = data["trestbps"];
      heartDiseaseForm["chol"].value = data["chol"];
      heartDiseaseForm["fbs"].value = data["fbs"];
      heartDiseaseForm["restecg"].value = data["restecg"];
      heartDiseaseForm["thalach"].value = data["thalach"];
      heartDiseaseForm["exang"].value = data["exang"];
      heartDiseaseForm["oldpeak"].value = data["oldpeak"];
      heartDiseaseForm["slope"].value = data["slope"];
      heartDiseaseForm["ca"].value = data["ca"];
      heartDiseaseForm["thal"].value = data["thal"];
      const target = data["target"];
      const formData = new FormData(heartDiseaseForm);
      const formResponse = await fetch("/heart/predict", {
        method: "POST",
        body: formData,
      });
      if (formResponse.ok) {
        const formResponseData = await formResponse.json();
        let html = `
      <div class="card text-bg-${formResponseData.status} mb-3 my-3">
    <div class="card-body">
      <h5 class="card-title">Actual Result: ${
        target ? "Has Heart Disease" : "Does not have Heart Disease"
      }</h5>
      <p class="card-text">Prediction: ${formResponseData.message}
      </p>
    </div>
  </div>
      `;
        heartDiseasePrediction.innerHTML = html;
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
    heartDiseasePrediction.innerHTML = html;
  }
  heartDiseasePrediction.scrollIntoView({ behavior: "smooth" });
});