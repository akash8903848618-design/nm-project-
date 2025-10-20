<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SecureApp - Login Protection</title>

  <style>
    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      margin: 0;
      background: linear-gradient(to bottom right, #2563eb, #1e40af);
      color: #333;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    h1, h2 {
      text-align: center;
      margin-bottom: 10px;
      color: #1e3a8a;
    }

    p {
      text-align: center;
      color: #555;
      font-size: 14px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 8px 0 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    button {
      width: 100%;
      padding: 10px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #1d4ed8;
    }

    .error {
      background: #fee2e2;
      color: #b91c1c;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
    }

    .link {
      background: none;
      border: none;
      color: #2563eb;
      font-weight: bold;
      cursor: pointer;
    }

    .dashboard {
      max-width: 600px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .logout-btn {
      background: #ef4444;
      margin-top: 20px;
    }

    .logout-btn:hover {
      background: #dc2626;
    }

    .section {
      margin-top: 15px;
      padding: 15px;
      border-left: 4px solid #2563eb;
      background: #f1f5f9;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
    let users = [];
    let currentUser = null;
    let page = 'login';
    const app = document.getElementById('app');

    function render() {
      if (currentUser) {
        app.innerHTML = `
          <div class="dashboard">
            <h1>Welcome, ${currentUser.name}!</h1>
            <p>You have successfully logged in.</p>

            <div class="section">
              <h3>Profile</h3>
              <p><strong>Name:</strong> ${currentUser.name}</p>
              <p><strong>Email:</strong> ${currentUser.email}</p>
            </div>

            <div class="section">
              <h3>Status</h3>
              <p><strong>✓ Authenticated</strong></p>
              <p>Full access granted</p>
            </div>

            <button class="logout-btn" onclick="logout()">Logout</button>
          </div>
        `;
        return;
      }

      if (page === 'signup') {
        app.innerHTML = `
          <div class="container">
            <h1>Create Account</h1>
            <p>Join SecureApp today</p>
            <div id="error" class="error" style="display:none"></div>
            <input id="signupName" type="text" placeholder="Full Name" />
            <input id="signupEmail" type="email" placeholder="Email" />
            <input id="signupPassword" type="password" placeholder="Password" />
            <input id="signupConfirm" type="password" placeholder="Confirm Password" />
            <button onclick="handleSignup()">Create Account</button>
            <p>Already have an account? <button class="link" onclick="switchToLogin()">Login here</button></p>
          </div>
        `;
      } else {
        app.innerHTML = `
          <div class="container">
            <h1>SecureApp</h1>
            <p>Login to your account</p>
            <div id="error" class="error" style="display:none"></div>
            <input id="loginEmail" type="email" placeholder="Email" />
            <input id="loginPassword" type="password" placeholder="Password" />
            <button onclick="handleLogin()">Login</button>
            <p>Don't have an account? <button class="link" onclick="switchToSignup()">Sign up here</button></p>
          </div>
        `;
      }
    }

    function showError(msg) {
      const errorDiv = document.getElementById('error');
      errorDiv.textContent = msg;
      errorDiv.style.display = 'block';
    }

    function handleLogin() {
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (!email || !password) {
        showError('Please fill in all fields');
        return;
      }

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        currentUser = user;
        render();
      } else {
        showError('Invalid email or password');
      }
    }

    function handleSignup() {
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value.trim();
      const confirm = document.getElementById('signupConfirm').value.trim();

      if (!name || !email || !password || !confirm) {
        showError('Please fill in all fields');
        return;
      }
      if (password !== confirm) {
        showError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
      }
      if (users.some(u => u.email === email)) {
        showError('Email already registered');
        return;
      }

      users.push({ id: Date.now(), name, email, password });
      page = 'login';
      alert('Account created successfully!');
      render();
    }

    function logout() {
      currentUser = null;
      page = 'login';
      render();
    }

    function switchToSignup() {
      page = 'signup';
      render();
    }

    function switchToLogin() {
      page = 'login';
      render();
    }

    render();
  </script>
</body>
</html>
