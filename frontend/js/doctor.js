function populateDoctorProfile() {
  // Retrieve doctor user ID from local storage
  const doctorId = localStorage.getItem("userId");

  // Send GET request to API to retrieve doctor profile
  fetch(`http://localhost:3000/docprofile/get/${doctorId}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate form fields with retrieved data
      document.getElementById("name").value = data.name;
      document.getElementById("dob").value = data.dob;
      document.getElementById("gender").value = data.gender;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("speciality").value = data.speciality;
      document.getElementById("age-group").value = data.ageGroup;
      document.getElementById("highest-qualification").value =
        data.highestQualification;
      document.getElementById("achievements").value = data.achievements;
    })
    .catch((error) => console.error(error));
}

window.onload = populateDoctorProfile;

function updateDoctorProfile() {
  const id = localStorage.getItem("userId");

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const isDoctor = document.getElementById("isDoctor").checked;
  const gender = document.getElementById("gender").value;
  const speciality = document.getElementById("speciality").value;
  const ageGroup = document.getElementById("age-group").value;
  const highestQualification = document.getElementById(
    "highest-qualification"
  ).value;
  const achievements = document.getElementById("achievements").value;

  fetch(`http://localhost:3000/docprofile/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      "name": name,
      "dob": dob,
      "email": email,
      "phone": phone,
      "isDoctor": isDoctor,
      "gender": gender,
      "speciality": speciality,
      "ageGroup": ageGroup,
      "highestQualification": highestQualification,
      "achievements": [achievements],
      "timings": [],
      "patients": [],
      "appointments": [],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Doctor profile updated:", data);
      // Update UI or show success message to user
    })
    .catch((error) => {
      console.error("Error updating doctor profile:", error);
      // Show error message to user
    });
}

document.getElementById("update").addEventListener("click", () => {
  updateDoctorProfile();
});

