const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  loginBtn.classList.remove("active");
  registerBtn.classList.add("active");
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const isDoctor = document.getElementById("login-isDoctor").checked;

  // Send POST request to server with user's email and password
  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      isDoctor,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Login failed");
      }
    })
    .then((data) => {
      localStorage.setItem("userId", data.userId); // Store user ID in localStorage for further communication
      alert("Login successful");
    });
}

document.getElementById("login").addEventListener("click", () => {
  login();
});

async function register() {
  try{
    
    const response = await fetch("http://localhost:3000/test", {
      method: "GET",
      mode: "no-cors",
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}


  //   const name = document.getElementById("register-name").value;
  //   const email = document.getElementById("register-email").value;
  //   const password = document.getElementById("register-password").value;
  //   const phone = document.getElementById("register-phone").value;
  //   const dob = document.getElementById("register-dob").value;
  //   const isDoctor = document.getElementById("register-isDoctor").checked;
  
  //   const response = await fetch("http://localhost:3000/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       "name" : name,
  //       "email" : email,
  //       "password" : password,
  //       "phone" : phone,
  //       "dob" : dob,
  //       "isDoctor" : isDoctor
  //     }),
  //   });
  
  //   if (response.ok) {
  //     alert("Registration successful");
  //     if (isDoctor) {
  //       window.location.href = "doctor_homepage.html";
  //     } else {
  //       window.location.href = "patient_homepage.html";
  //     }
  //   } else {
  //     alert("Registration failed");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   alert("Registration failed");
  // }
// }

document.getElementById("register").addEventListener("click", () => {
  register();
});
