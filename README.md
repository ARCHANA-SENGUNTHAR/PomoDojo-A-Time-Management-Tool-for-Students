
# 🍅 PomoDojo – A Time Management Tool for Students

> _"Eat, Code, Sleep - Repeat"_  
> Boost your productivity with the Pomodoro technique.

Welcome to **PomoDojo**, a productivity web app designed to help students stay focused and manage time effectively using the **Pomodoro Technique**.  
With a clean interface, personalized session tracking, and interactive UI, PomoDojo helps you take control of your study habits like a ninja! 🥷📚

---

# [Live Website](https://pomodojo-fawn.vercel.app/)

# [Project Explanation](https://youtu.be/fMlRTETv6YQ)

---
## 🚀 Features

- ⏲️ **Pomodoro Timer** – Start, pause, reset your 25-minute focus sessions
- 👤 **User Authentication** – Secure sign up/login with JWT-based session management
- 📝 **Session Logging** – Save each Pomodoro session with task name & duration
- 📊 **Session History** – View past sessions stored in MongoDB
- 🧠 **Personalized Dashboard** – Track your productivity, your way!
- 💻 **Responsive UI** – Works beautifully across devices
- ⚡ **Full Stack MERN** – Built with MongoDB, Express.js, React, and Node.js

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (Hooks + Axios)  
- CSS Modules

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- JWT for secure routes  
- Bcrypt.js for password encryption

---

## 📁 Project Structure

```

PomoDojo/
├── client/          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── server/          # Backend (Node + Express)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── README.md
└── package.json

````

---

## 🔐 User Authentication

- Passwords are securely hashed using **bcrypt**
- JWT tokens are stored in localStorage
- Authenticated users can:
  - Store their sessions
  - View only their own history
  - Access a personalized Pomodoro tracker

---

## 🧪 Setup & Run Locally

1. **Clone the repo**
   ```bash
   git clone https://b.com/ARCHANA-SENGUNTHAR/PomoDojo-A-Time-Management-Tool-for-Students.git
   ```
   
2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```
   
3.  **Install backend dependencies**
    ```bash
    cd ../server
    npm install
    ```

4. **Start frontend**
    ```bash
    cd ../client
    npm start
    ```
5. **Start backend**
   ```bash
   cd ../server
   node index.js
   ```

---

## 🧠 Inspiration

- Built with ❤️ to help students conquer distractions and manage time efficiently.
- Whether you're preparing for exams or just want to stay on top of tasks, PomoDojo will be your study companion!

---

## ✨ Future Scope

- Visual analytics/dashboard for completed sessions
- Desktop/mobile notifications for break time
- Streaks for daily practice of Time management

---

## 🙌 Acknowledgements

- Inspired by the Pomodoro Technique
- Built and maintained by Archana Sengunthar and collaborator Deepika S

---

## 📬 Contact

 **Archana Sengunthar**
📧 Email: [archanagurusamy648@gmail.com](mailto:archanagurusamy648@gmail.com)  
🔗 GitHub: [github.com/ARCHANA-SENGUNTHAR](https://github.com/ARCHANA-SENGUNTHAR)

**Deepika S**
📧 Email: [studiesfor456@gmail.com](mailto:studiesfor456@gmail.com)  
🔗 GitHub: [github.com/Deepikasel](https://github.com/Deepikasel)

