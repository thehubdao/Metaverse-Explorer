import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

export default function FeedbackButtonsUI() {
  const [openAlert, setOpenAlert] = useState(false);
  const handleFeedback = () => {
    setOpenAlert(true);
  };
  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <p className="text-center text-lm-text dark:text-nm-highlight mt-2 font-normal text-sm">Do you like this price estimation?</p>
      <div className="flex justify-between py-3 gap-1">
        <button className="bg-[#1AB3F3] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Perfect
        </button>
        <button className="bg-[#FF4949] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Overvalued
        </button>
        <button className="bg-[#47E298] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Undervalued
        </button>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: '100%' }}
            icon={<AiFillHeart />}
          >
            Thanks for your feedback
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}