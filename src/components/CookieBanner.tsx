import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookieConsent");
      if (stored === "true") {
        setConsent(true);
        setVisible(false);
      } else if (stored === "false") {
        setConsent(false);
        setVisible(true);
      } else {
        // show banner if no choice yet
        setVisible(true);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookieConsent", "true");
    } catch (e) {}
    setConsent(true);
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem("cookieConsent", "false");
    } catch (e) {}
    setConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-full px-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-sm text-slate-700">
          We use cookies to improve your experience. By continuing, you accept our use of cookies.
        </div>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl text-sm bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-xl text-sm bg-[#455d58] text-white hover:bg-[#374643]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
