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