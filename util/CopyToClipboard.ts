import { toast } from "react-toastify";

const copyToClipboard = (text: string) => {
  // copy room id to the clipboard
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};

export default copyToClipboard;
