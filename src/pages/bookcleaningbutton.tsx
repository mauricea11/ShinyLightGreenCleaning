import { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";

export default function BookCleaningButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Book a Cleaning
      </button>

      {typeof window !== 'undefined' && (
        <PopupModal
          url="https://calendly.com/mariejeanneaka"
          open={open}
          onModalClose={() => setOpen(false)}
          rootElement={document.body}
        />
      )}
    </>
  );
}