import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { RiCloseLine } from "react-icons/ri";
import { RxCaretDown } from "react-icons/rx";

import "./style.css";

export type SelectOption = {
  value: string;
  index: number;
};

type Props = {
  values: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

const options = [
  { value: "Africa", index: 0 },
  { value: "Americas", index: 1 },
  { value: "Asia", index: 2 },
  { value: "Europe", index: 3 },
  { value: "Oceania", index: 4 },
];

export default function RegionSelect({ values, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const selectRef = useRef<HTMLDivElement>(null);

  function clearValues() {
    if (values.length > 0) onChange([]);
  }

  // Selects an option and removes an option if it's already selected
  function chooseOption(option: SelectOption) {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
    } else {
      onChange([...values, option]);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return values.includes(option);
  }

  function handleKeyboardNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.target !== selectRef.current) return;

    switch (e.code) {
      case "Enter":
      case "Space":
        e.preventDefault();
        setIsOpen(!isOpen);
        if (isOpen) chooseOption(options[highlightedIndex]);
        break;

      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          break;
        }
        const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
        if (newValue >= 0 && newValue < options.length) {
          setHighlightedIndex(newValue);
        }
        break;
      }

      case "Escape":
        setIsOpen(false);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      role="menu"
      tabIndex={0}
      ref={selectRef}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => handleKeyboardNavigation(e)}
      className="select | filter-container"
    >
      {values.length < 1 ? (
        <p className="select__placeholder | clr-accent">Filter By Region</p>
      ) : (
        <ul role="list" className="select__values">
          {values.map((value) => (
            <li key={value.index}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  chooseOption(value);
                }}
                className="filter-value-btn bg-primary-200"
              >
                {value.value} <RiCloseLine />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        aria-label="clear select options"
        onClick={(e) => {
          e.stopPropagation();
          clearValues();
        }}
        className="select__clear-btn | fs-500"
      >
        <RiCloseLine />
      </button>

      <div className="select__divider" />

      <button
        type="button"
        aria-label="open select menu"
        onClick={() => setIsOpen(!isOpen)}
        className="select__caret-btn | fs-500"
      >
        <RxCaretDown />
      </button>

      <ul
        role="list"
        className={clsx(isOpen && "open", "select__options | filter-container")}
      >
        {options.map((option) => (
          <li key={option.index} className="select__options-item">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                chooseOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(option.index)}
              className={clsx(
                isOptionSelected(option) && "selected",
                highlightedIndex === option.index && "highlighted",
                "select__option-value"
              )}
            >
              {option.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
