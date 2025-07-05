# 🛡️ Account Verification App

A **Node.js & Express** app using **MongoDB**, featuring:

- ✅ Email verification via OTP  
- 🔐 Secure login for verified users  
- 🔄 Password reset with OTP support
- 🗄️ Secure Storage: User data stored in MongoDB with hashed credentials and expiry logic.

## 📋 Features

- 🧾 **User Registration** with email and password
- 🔐 **Login** only for verified accounts
- 📩 **OTP Email Verification**
- 🔁 **Password Reset** via OTP
- 🍪 **JWT Auth** using httpOnly cookies
- ⏱️ OTP expires after 10 minutes

---

## 🧪 Tech Stack

| Layer         | Technology                  |
|---------------|------------------------------|
| Backend       | Node.js, Express.js         |
| Database      | MongoDB (Mongoose)          |
| Email Service | Nodemailer (SMTP)           |
| Auth          | bcrypt, JWT                 |
| Environment   | dotenv                      |

---


---

## 🚀 Getting Started
### 1. Clone the repo

```bash
git clone https://github.com/rou-nak-cloud/Account-Verification.git
npm install
npm run dev

cd Account-Verification
```

```
Environments:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password
SENDER_EMAIL=your_email@example.com
```

##🔐 Security Measures

- **Password Hashing using bcrypt**
- **JWT Tokens for secure auth**
- **httpOnly Cookies for protection**
- **OTP Expiry set for 10 minutes**
- **Input validation and proper error handling**

## Author
-- *Rounak Bakshi**
