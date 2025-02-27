"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useContext } from "react";
import { tableContext } from "../context/TableProvider";
import { Warning, WarningCircle } from "@phosphor-icons/react";

function TableModal() {
  const { empty, setEmpty } = useContext(tableContext);

  return (
    <Dialog open={empty} onClose={setEmpty} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100">
                <Warning
                  aria-hidden="true"
                  className="size-12 text-amber-400"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-700"
                >
                  Sorry Teacher or Classroom are not Avilable at this Time
                </DialogTitle>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 text-end">
              <button
                type="button"
                data-autofocus
                onClick={() => setEmpty(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-slate-50 shadow-sm cursor-pointer hover:bg-red-500 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default TableModal;
