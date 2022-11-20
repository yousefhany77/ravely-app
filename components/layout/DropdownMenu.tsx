"use client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { AiFillCheckCircle, AiFillDownCircle } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useFilters } from "../../hooks/useFilters";
interface Props {
  label: string;
  options: {
    id: number;
    name: string;
  }[];
}
export default function Dropdown({ options, label }: Props) {
  const [selected, setSelected] = useState({
    id: 0,
    name: `select ${label}`,
  });
  const [query, setQuery] = useState("");
  const { mutate } = useFilters();
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex items-center gap-2 ">
      <label
        htmlFor={label}
        className="font-medium text-white text-lg capitalize"
      >
        {label}:
      </label>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 flex-grow xl:flex-grow-0" id={label}>
          <div className="relative w-full cursor-default  overflow-hidden  bg-light-gray text-left shadow-md  sm:text-sm border border-gray-600 rounded-full ">
            <Combobox.Input
              className="w-full bg-darkest border-none py-2 pl-3 pr-10 text-sm leading-5 text-white capitalize "
              displayValue={(option: { id: number; name: string }) =>
                option.name
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 rounded-3xl">
              <AiFillDownCircle
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="z-50  absolute mt-1 max-h-60 w-full overflow-auto rounded-3xl bg-darkest py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-red">
                  Nothing found.
                </div>
              ) : (
                <>
                  {filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.id}
                      onClick={() => mutate(label, option.name)}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-red text-white" : "text-light-gray"
                        }`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-red"
                              }`}
                            >
                              <AiFillCheckCircle
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
