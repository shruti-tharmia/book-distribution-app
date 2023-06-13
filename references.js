const adminLoginButton = document.getElementById("admin-button");
const registerButton = document.getElementById("register-button");
const adminLoginForm = document.getElementById("admin-login-form");
const background = document.getElementById("background");
const signupForm = document.getElementById("signup-form");
const closeSignupButton = document.getElementById("close-signup-button");
const closeLoginButton = document.getElementById("close-login-button");
const submitAdminLogin = document.getElementById("submit-admin-login");

const errorMessage = document.getElementById("error-message");
const displayMessage = document.getElementById("display-message");

const adminPage = document.getElementById("admin-page");
const workerPage = document.getElementById("worker-page");
const workerCardContainer = document.getElementsByClassName(
  "worker-card-container"
);
const schoolCardContainer = document.getElementsByClassName(
  "school-card-container"
);
const adminCardContainer = document.getElementById("admin-card-container");
const submitDetailsForm = document.getElementById("submit-details-form");
const detailsForm = document.getElementById("details-form");
const closeDetailsButton = document.getElementById("close-details-button");

const addSchoolButton = document.getElementById("add-school-button");
const addSchoolForm = document.getElementById("add-school-form");
const closeSchoolForm = document.getElementById("close-add-school-button");
const viewRequestsButton = document.getElementById("view-requests-button");
const closeRequestsButton = document.getElementById("close-requests-button");
const requestsSection = document.getElementById("requests-section");
const requestsCardSection = document.getElementById("requests-card-section");
const assignSchoolButton = document.getElementById("assign-school-button");
const assignSchoolSection = document.getElementById("assign-school-section");
const closeAssignButton = document.getElementById("close-assign-button");

const schoolName = document.getElementById("school-name");
const submitDetailsButton = document.getElementById("submit-details-button");
const className = document.getElementsByClassName("class-name");
const subjectName = document.getElementsByClassName("subject-name");

const formForLogin = document.getElementById("form-for-login");
const signUpForm = document.getElementById("sign-up-form");
const submitSignup = document.getElementById("submit-signup");

const approveRequestsButton = document.querySelectorAll(
  ".approve-request-button"
);
const rejectRequestsButton = document.getElementById("reject-request-button");

const saveAddSchoolButton = document.getElementById("save-add-school-button");
const addSchool = document.getElementById("add-school");
const adminCards = document.getElementById("admin-cards");

const adminLogoutButton = document.getElementById("admin-logout-button");
const frontPage = document.getElementById("frontPage");
const workerLogoutButton = document.getElementById("worker-logout-button");

const schoolsTab = document.getElementById("school-tab");
const schoolsButton = document.getElementById("schools-button");
const closeSchoolTabButton = document.getElementById("close-school-tab-button");
const schoolDetails = document.getElementById("school-details-div");
const closeSchoolDetails = document.getElementById(
  "close-school-details-button"
);
const adminSchoolCards = document.getElementById("display-admin-school-cards");
const editSchool = document.getElementById("edit-school-button");
const adminDashboard = document.getElementById("admin-dashboard");
const assignedSchoolToWorker = document.getElementById(
  "assigned-school-to-worker"
);

const year = document.getElementById("year");
const getData = document.getElementById("get-data");
const headingText = document.getElementById("heading-text");

export default {
  adminLoginButton,
  registerButton,
  adminLoginForm,
  background,
  signupForm,
  closeLoginButton,
  closeSignupButton,
  errorMessage,
  displayMessage,
  adminPage,
  workerCardContainer,
  submitDetailsForm,
  closeDetailsButton,
  addSchoolButton,
  addSchoolForm,
  closeSchoolForm,
  closeRequestsButton,
  viewRequestsButton,
  requestsSection,
  assignSchoolSection,
  assignSchoolButton,
  closeAssignButton,
  adminCardContainer,
  workerPage,
  detailsForm,
  submitDetailsButton,
  schoolName,
  className,
  subjectName,
  formForLogin,
  signUpForm,
  submitAdminLogin,
  submitSignup,
  requestsCardSection,
  approveRequestsButton,
  rejectRequestsButton,
  saveAddSchoolButton,
  addSchool,
  adminCards,
  adminLogoutButton,
  frontPage,
  workerLogoutButton,
  schoolsTab,
  schoolsButton,
  closeSchoolTabButton,
  schoolCardContainer,
  schoolDetails,
  closeSchoolDetails,
  adminSchoolCards,
  editSchool,
  adminDashboard,
  assignedSchoolToWorker,
  year,
  getData,
  headingText,
};
