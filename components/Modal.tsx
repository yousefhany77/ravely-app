import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function Modal({
  children,
  handler,
}: {
  children: React.ReactNode;
  handler: Function;
}) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 font-medium">
          <Dialog.Title
            className={"font-extrabold text-2xl m-4 text-center text-red"}
          >
            Delete My Account
          </Dialog.Title>
          {children}
          <div className="flex gap-4 my-2">
              <button
                className=" w-1/2  rounded-xl px-4 py-2 bg-red text-white transition-colors duration-200 ease-in-out hover:bg-rose-800"
                onClick={() => handler()}
              >
                Delete
              </button>
              <button
                className=" w-1/2  rounded-xl px-4 py-2 bg-slate-800 text-white transition-colors duration-200 ease-in-out hover:bg-slate-400"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function MyDialog() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>Complete your order</Dialog.Title>

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
