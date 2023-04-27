async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const isDoctor = document.getElementById("login-isDoctor").checked;

  // Send POST request to server with user's email and password
  console.log(email, password, isDoctor);
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password":password,
        "isDoctor":isDoctor,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userId", data.userId);
      console.log("login successful");
      if (isDoctor) {
        window.location.href = "doctor_homepage.html";
      } else {
        window.location.href = "patient_homepage.html";
      }
    } else {
      alert("login failed");
    }
  } catch (error) {
    console.error(error);
    alert("login failed - catch block");
  }
}

document.getElementById("login").addEventListener("click", (event) => {
  event.preventDefault();
  login();
});

async function register() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const phone = document.getElementById("register-phone").value;
  const dob = document.getElementById("register-dob").value;
  const isDoctor = document.getElementById("register-isDoctor").checked;
  // const name = "Nirbhay";
  // const email = "n2@gmail.com";
  // const password = "123n";
  // const phone = "123123123123";
  // const dob = "2021-05-05";
  // const isDoctor = true;
  console.log(name, email, password, phone, dob, isDoctor);
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        dob: dob,
        isDoctor: isDoctor,
      }),
    });

    if (response.ok) {
      // alert("Registration successful");
      if (isDoctor) {
        window.location.href = "doctor_homepage.html";
      } else {
        window.location.href = "patient_homepage.html";
      }
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.error(error);
    alert("Registration failed - catch block");
  }
}

document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  register();
});
