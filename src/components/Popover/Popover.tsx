import styles from "./Popover.module.css";
import { useState, useRef, type FC, useEffect, type ReactElement } from "react";

interface PopoverProps {
  children: ReactElement;
  title: string | ReactElement;
  btnClassName?: string;
  positionClass?: string;
}

const Popover: FC<PopoverProps> = ({
  children,
  title,
  btnClassName,
  positionClass,
}): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      const pop = popoverRef.current;
      const trig = triggerRef.current;
      const insidePop = !!pop && pop.contains(e.target);
      const onTrigger = !!trig && trig.contains(e.target);
      if (!insidePop && !onTrigger) setIsVisible(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  return (
    <div className={styles.popoverContainer}>
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className={`${styles.popoverTrigger} ${btnClassName}`.trim()}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {title}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className={`${styles.popoverContent} ${
            styles[`${positionClass}`]
          }`.trim()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
