import references from "./references.js";
import { http } from "./http.js";
import utility from "./utility.js";

references.adminLoginButton.addEventListener("click", () => {
  references.adminLoginForm.style.display = "block";
  references.background.style.display = "block";
});

references.registerButton.addEventListener("click", () => {
  references.background.style.display = "block";
  references.signupForm.style.display = "block";
});

references.closeLoginButton.addEventListener("click", () => {
  references.adminLoginForm.style.display = "none";
  references.background.style.display = "none";
});

references.closeSignupButton.addEventListener("click", () => {
  references.background.style.display = "none";
  references.signupForm.style.display = "none";
});

for (let card of references.workerCardContainer) {
  card.addEventListener("click", () => {
    references.detailsForm.style.display = "block";
    references.background.style.display = "block";
  });
}
for (let card of references.schoolCardContainer) {
  card.addEventListener("click", () => {
    references.schoolDetails.style.display = "block";
    references.background.style.display = "block";
  });
}

references.closeSchoolDetails.addEventListener("click", () => {
  references.schoolDetails.style.display = "none";
  references.background.style.display = "none";
});

references.closeDetailsButton.addEventListener("click", () => {
  references.detailsForm.style.display = "none";
  references.background.style.display = "none";
});

references.addSchoolButton.addEventListener("click", () => {
  references.addSchoolForm.style.display = "block";
  references.background.style.display = "block";
});

references.closeSchoolForm.addEventListener("click", () => {
  references.addSchoolForm.style.display = "none";
  references.background.style.display = "none";
});

references.assignSchoolButton.addEventListener("click", () => {
  references.assignSchoolSection.style.display = "block";
});

references.closeAssignButton.addEventListener("click", () => {
  references.assignSchoolSection.style.display = "none";
  references.background.style.display = "none";
});

references.viewRequestsButton.addEventListener("click", () => {
  references.requestsSection.style.display = "block";
});

references.closeRequestsButton.addEventListener("click", () => {
  references.requestsSection.style.display = "none";
  references.background.style.display = "none";
});

references.schoolsButton.addEventListener("click", () => {
  references.schoolsTab.style.display = "block";
  displaySchools();
});

references.closeSchoolTabButton.addEventListener("click", () => {
  references.schoolsTab.style.display = "none";
  references.adminSchoolCards.innerHTML = "";
});

references.editSchool.addEventListener("click", () => {
  references.addSchoolForm.style.display = "block";
  references.background.style.display = "block";
  references.schoolDetails.style.display = "none";
});

function setTimeOutForError() {
  setTimeout(() => {
    references.errorMessage.style.display = "none";
  }, 1500);
}

///////////////////////////////// post details form ////////////////////////////////////

references.submitDetailsButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let checkboxes = document.getElementsByClassName("class1");
  let values = [];
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      values.push(1);
    } else {
      values.push(0);
    }
  }
  let classes = [];
  for (let element of references.className) {
    classes.push(element.innerHTML);
  }
  console.log(classes);
  let lenOfClassesArray = classes.length;

  let subjects = [];
  for (let element of references.subjectName) {
    subjects.push(element.innerHTML);
  }
  let lenOfSubjectArray = subjects.length;
  console.log(lenOfSubjectArray);

  let finalArr = [];
  for (let index = 0; index < lenOfClassesArray; index++) {
    for (let index2 = 0; index2 < lenOfSubjectArray; index2++) {
      finalArr.push(classes[index]);
      finalArr.push(subjects[index2]);
    }
  }
  const data = {
    schoolName: references.schoolName.value,
    status: values,
  };

  const postFeedbackData = await http.post("school/submit-status", data);
  console.log(postFeedbackData);
  if (postFeedbackData.data) {
    references.displayMessage.innerHTML = postFeedbackData.data.message;
    references.errorMessage.style.display = "block";
  } else {
    references.displayMessage.innerHTML = postFeedbackData.data.message;
    references.errorMessage.style.display = "block";
  }
  references.detailsForm.style.display = "none";
});

///////////////////////////////// login post ////////////////////////////////////

references.submitAdminLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  const loginFormData = utility.getFormData(references.formForLogin);
  const response = await http.post("auth/login", loginFormData);

  if (response.data) {
    if (response.data.role === "ADMIN") {
      references.adminPage.style.display = "block";
      displayAllSchools();
      references.adminLoginForm.style.display = "none";
      references.background.style.display = "none";
      references.displayMessage.innerHTML = response.data.message;
      references.errorMessage.style.display = "block";
      setTimeOutForError();
    } else if (response.data.role === "WORKER") {
      references.workerPage.style.display = "block";
      references.adminLoginForm.style.display = "none";
      references.background.style.display = "none";
      references.displayMessage.innerHTML = response.data.message;
      references.errorMessage.style.display = "block";
      getAssignedSchool();
      setTimeOutForError();
    }
  } else {
    references.displayMessage.innerHTML = response.error.message;
    references.errorMessage.style.display = "block";
    setTimeOutForError();
  }
});

//////////////////// sign up post /////////////////////

references.submitSignup.addEventListener("click", async (e) => {
  e.preventDefault();
  const registrationFormData = utility.getFormData(references.signUpForm);
  const response = await http.post("auth/signup", registrationFormData);

  if (response.data) {
    references.displayMessage.innerHTML = response.data.message;
    references.errorMessage.style.display = "block";
    references.signupForm.style.display = "none";
    references.background.style.display = "none";
    setTimeOutForError();
  }
});

//////////////////// get all requests //////////////////

async function displayRequests() {
  const data = await http.get("user/pending-requests");
  if (!data.data) {
    references.requestsCardSection.innerHTML = `<h1>${data.error.message}</h1>`;
  }
  let cards = [];
  data.data.forEach((user) => {
    const card = `<div class="row">
    <div class="col1 worker-name">${user.username}</div>
    <div class="col2">
  <button
    type="button"
    class="approve-request-button"
    id="${user.id}"
  >
    Approve Request
  </button>
</div>
<div class="col3">
  <button
    type="button"
    class="reject-request-button"
    id="${user.id}"
  >
    Reject Request
  </button>
</div>
</div>`;
    cards.push(card);
    cards.join("");
    references.requestsCardSection.innerHTML = card;
  });
  approve();
  reject();
}

references.viewRequestsButton.addEventListener("click", () => {
  displayRequests();
});

////////////////////////////// approve & reject request ////////////////////

async function approveRequest(id) {
  const data = await http.put(`auth/approve/${id}`, {
    id: id,
  });
  references.displayMessage.innerHTML = data.data.message;
  references.errorMessage.style.display = "block";
  setTimeOutForError();
}

function approve() {
  const listOfPendingWorkers = document.querySelectorAll(
    ".approve-request-button"
  );
  console.log(listOfPendingWorkers);

  for (let user of listOfPendingWorkers) {
    user.addEventListener("click", () => {
      approveRequest(`${user.id}`);
    });
  }
}

async function rejectRequest(id) {
  const data = await http.delete(`auth/reject/${id}`);
  references.displayMessage.innerHTML = data.data.message;
  references.errorMessage.style.display = "block";
  setTimeOutForError();
}

function reject() {
  const newListOfPendingUsers = document.querySelectorAll(
    ".reject-request-button"
  );
  console.log(newListOfPendingUsers);

  for (let user of newListOfPendingUsers) {
    user.addEventListener("click", () => {
      rejectRequest(`${user.id}`);
      references.approveRequestsButton.style.display = "none";
    });
  }
}

////////////////////// get all schools - admin dashboard ////////////////

references.getData.addEventListener("click", async (e) => {
  e.preventDefault();
  let year = references.year.value;
  displayAllSchools(year);
});

async function displayAllSchools(year = "2022") {
  const data = await http.get(`school/analytics?year=${year}`);
  references.headingText.innerHTML = `<h1 class="dashboard-heading"> Subject wise book Distribution count of all schools for year ${year}</h1>`;
  console.log(data);
  if (!data.data) {
    references.adminDashboard.innerHTML = data.error.message;
  } else {
    let cards = [];
    for (let index in data.data) {
      const card = `<div class="admin-dashboard-card">
      <h2 class="red">${index}</h2>
      <h3>NONE : ${data.data[index].NONE}</h3>
      <h3>PARTIAL : ${data.data[index].PARTIAL}</h3>
      <h3>FULL : ${data.data[index].FULL}</h3>
    </div>`;
      cards.push(card);
      cards.join("");
    }
    references.adminDashboard.innerHTML = cards;
  }
}

/////////////////////// add school ///////////////////////

references.saveAddSchoolButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const addSchoolFormData = utility.getFormData(references.addSchool);
  const response = await http.post("school", addSchoolFormData);
  if (response.data) {
    references.displayMessage.innerHTML = response.data.message;
    references.errorMessage.style.display = "block";
    references.addSchoolForm.style.display = "none";
    references.background.style.display = "none";
    setTimeOutForError();
  }
});

///////////////////// admin-logout /////////////////////

async function adminLogout() {
  const data = await http.get("auth/logout");
  if (data.data) {
    references.displayMessage.innerHTML = data.data.message;
    references.errorMessage.style.display = "block";
    setTimeOutForError();
  }
}
references.adminLogoutButton.addEventListener("click", () => {
  adminLogout();
  references.frontPage.style.display = "flex";
  references.adminPage.style.display = "none";
});

/////////////////////// worker-logout ///////////////////

async function workerLogout() {
  const data = await http.get("auth/logout");
  if (data.data) {
    references.displayMessage.innerHTML = data.data.message;
    references.errorMessage.style.display = "block";
    setTimeOutForError();
  }
}
references.workerLogoutButton.addEventListener("click", () => {
  workerLogout();
  references.frontPage.style.display = "flex";
  references.workerPage.style.display = "none";
});

////////////////////// display admin-school-cards ////////////////////

async function displaySchools() {
  const data = await http.get("school/");
  if (!data.data) {
    references.adminSchoolCards.innerHTML = data.error.message;
  } else {
    data.data.forEach((school) => {
      const card = `<div class="card" id="worker-card">
      <div class="school-card-container" id="${school.id}">${school.name}</div>
    </div>`;
      references.adminSchoolCards.innerHTML += card;
      // console.log(card)
    });
    addFunctionToCards();
    removeSchool();
  }
}

function addFunctionToCards() {
  let cards = document.getElementsByClassName("school-card-container");
  for (let card of cards) {
    card.addEventListener("click", (e) => {
      references.schoolDetails.style.display = "block";
      references.background.style.display = "block";
    });
  }
}
/////////////////// delete school //////////////////

async function deleteSchool(id) {
  const data = await http.delete(`school/${id}`);
}

function removeSchool() {
  const listOfSchools = document.querySelectorAll(".delete-school-button");
  console.log(listOfSchools);

  for (let school of listOfSchools) {
    school.addEventListener("click", () => {
      let id = school.parentElement.children[0];
      deleteSchool(`${id}`);
    });
  }
}

//////////////// edit school button //////////////////

references.saveAddSchoolButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const addSchoolFormData = utility.getFormData(references.addSchool);
  const response = await http.put("school", addSchoolFormData);
  if (response.data) {
    references.displayMessage.innerHTML = response.data.message;
    references.errorMessage.style.display = "block";
    references.addSchoolForm.style.display = "none";
    references.background.style.display = "none";
    setTimeOutForError();
  }
});

////////////////////// get assigned school ////////////////

async function getAssignedSchool() {
  const data = await http.get("user/assignedSchool");
  console.log(data.data);
  if (!data.data) {
    references.assignedSchoolToWorker.innerHTML = data.error.message;
  } else {
    let cards = [];
    for (let school of data.data) {
      let card = `<div class="assigned-school-card" id="worker-card">
    <div class="worker-card-container" id="${school.id}">${school.name}</div>
  </div>`;
      cards.push(card);
    }
    cards.join("");
    console.log(cards);
    references.assignedSchoolToWorker.innerHTML = cards;

    let list = document.querySelectorAll(".worker-card-container");
    console.log(list);
    for (let element of list) {
      element.addEventListener("click", () => {
        references.detailsForm.style.display = "block";
      });
    }
  }
}
