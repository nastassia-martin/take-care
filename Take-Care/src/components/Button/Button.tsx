import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./styles.module.scss";
type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps = {
  text: string;
  ariaLabel: ButtonAttributes["aria-label"];
  type: ButtonAttributes["type"];
  disabled?: ButtonAttributes["disabled"];
  onClick?: ButtonAttributes["onClick"];
  children?: React.ReactNode;
};

const Button = ({
  // text,
  ariaLabel,
  children,
  onClick,
  type,
  disabled,
}: ButtonProps): ReactElement => {
  return (
    <button
      aria-label={ariaLabel}
      className={styles.Button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
