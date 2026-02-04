import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast
      .promise(authService.signUp(email, password, username), {
        loading: "กำลังสมัครสมาชิก...",
        success: "สมัครสำเร็จ! ตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตนนนนน",
        error: (err) => err.message || "สมัครไม่สำเร็จ",
      })
      .then(() => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F5FF]">
      {/* Card for Create */}
      <div className="max-w-md w-full p-12 flex flex-col items-center">
        <img
          src={logo}
          alt="CashDash Logo"
          className="w-[120px] h-[120px] mx-auto mb-4"
        />
        {/* Create Account */}
        <div className="text-center mb-2">
          <h1 className="font-lilita text-[50px] text-[#295F8D]">
            Create Account
          </h1>
        </div>

        {/* fill format */}
        <form onSubmit={handleSignUp} className="w-[322px] space-y-4">
          <div>
            <label className="font-lilita text-[20px] text-[#7194B3] ml-2">
              Username
            </label>
            <input
              type="text"
              placeholder="แสดงในหน้า Home"
              className="input-base"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-lilita text-[20px] text-[#7194B3] ml-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="input-base"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-lilita text-[20px] text-[#7194B3] ml-2">
              Password
            </label>
            <input
              type="password"
              placeholder="รหัสผ่าน 6 ตัวขึ้นไป"
              className="input-base"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* submit btn  */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-0.5 bg-[#295F8D] rounded-[14px] font-lilita text-white text-[35px]
                          hover:bg-indigo-600 transition disabled:bg-gray-400 shadow-figma"
            >
              {loading ? "กำลังสร้างบัญชี..." : "Register"}
            </button>
          </div>
        </form>

        {/* Login  */}
        <p className="mt-6 text-center text-[15px]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#295F8D] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
