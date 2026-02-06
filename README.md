# 💰 CashDash - Smart Expenses & Budget Tracker

**CashDash** คือระบบจัดการรายรับ-รายจ่ายอัจฉริยะที่ช่วยให้คุณวางแผนการเงินได้อย่างมีประสิทธิภาพ พัฒนาขึ้นภายใต้โครงสร้างที่ทันสมัยและขยายผลได้ง่าย

## ✨ Features (Sprint 1-2)
- **Authentication System:** ระบบสมัครสมาชิกและเข้าสู่ระบบผ่านอีเมล
- **Personal Profiles:** เก็บข้อมูลผู้ใช้งานแยกส่วนบุคคลด้วย Supabase Profiles
- **Real-time Balance:** แสดงยอดเงินคงเหลือปัจจุบันพร้อมดีไซน์ที่ชัดเจน
- **Transaction History:** ระบบบันทึกและแสดงรายการธุรกรรม (Income/Expense)

## 🛠 Tech Stack
- **Frontend:** React.js + Vite
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase
- **Email Service:** Resend (Custom SMTP)

## 📂 Project Structure
```text
src/
├── components/   # ส่วนประกอบย่อย (UI Components)
├── pages/        # หน้าหลัก (Home, Login, SignUp, etc.)
├── services/     # การเชื่อมต่อ Supabase & Auth
└── styles/       # ไฟล์ CSS & Tailwind
```

## 🚀 How to Start (For Team Members)

After cloning the repository, please follow these 3 steps to set up the project on your local machine:

### 1. Install Dependencies
Since the `node_modules` folder is ignored by Git to keep the repository lightweight, you must download all necessary libraries (React, Tailwind CSS, Supabase SDK, etc.) by running:
```bash
npm install
```
2. Environment Configuration
The project requires connection keys to communicate with our shared Supabase database.
- Create a new file named .env.local in the root directory.
- Add the following keys (Please contact the project owner for the actual values):
```
VITE_SUPABASE_URL=supabase_url  
VITE_SUPABASE_ANON_KEY=upabase_anon_key
```
3. Run the Project
Once the installation and configuration are complete, start the development server to preview the app:
```bash
npm run dev
```
### คำแนะนำ:
* **Database Awareness:** การแก้ไขข้อมูลผ่าน Supabase Dashboard จะส่งผลถึงทุกคนในทีม
* **Branching Reminder:** แนะนำให้ Checkout ไปยัง Branch ที่แบ่งตามฟีเจอร์ เช่น `feat/fe-...` หรือ `feat/be-...` ก่อนเริ่มเขียนโค้ด
* **Node version:** ต้องใช้ node version 22.0.0 ขึ้นไป