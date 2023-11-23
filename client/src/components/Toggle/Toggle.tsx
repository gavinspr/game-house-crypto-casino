import React, { useState } from "react";
import styles from "./Toggle.module.scss";
import { LayoutGroup, motion } from "framer-motion";

type PropTypes = {
  id: string;
  options: Array<string>;
  toggleHandler: (option: string) => void;
  defaultOption?: string;
  className?: string;
};

export const Toggle = ({
  id,
  options,
  toggleHandler,
  defaultOption,
  className,
}: PropTypes) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOption ?? options[0]
  );

  const handleToggle = (option: string) => {
    setSelectedOption(option);
    toggleHandler(option);
  };

  return (
    <LayoutGroup>
      <div className={`${styles.wrap} ${className}`}>
        {options.map((option: string) => (
          <div
            key={option}
            className={styles.container}
            onClick={() => handleToggle(option)}
          >
            <span>{option}</span>
            {selectedOption === option ? (
              <motion.div
                className={styles.activeBox}
                layoutId={`${id}-toggler`}
                transition={{
                  type: "spring",
                  stiffness: 475,
                  damping: 35,
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
};
