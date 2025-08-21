import { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("https://crypto-support-resistance.onrender.com/")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return (
    <div className="p-6 text-xl font-bold">
      Frontend + Backend Connected ✅ <br/>
      Message: {msg}
    </div>
  );
}
