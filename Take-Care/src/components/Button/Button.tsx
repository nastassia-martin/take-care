import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps = {
  ariaLabel: ButtonAttributes["aria-label"];
  type?: ButtonAttributes["type"];
  disabled?: ButtonAttributes["disabled"];
  onClick?: ButtonAttributes["onClick"];
  children?: React.ReactNode;
  className?: ButtonAttributes["className"];
};

const Button = ({
  ariaLabel,
  className,
  children,
  onClick,
  type,
  disabled,
}: ButtonProps): ReactElement => {
  return (
    <button
      aria-label={ariaLabel}
      className={classNames(styles.Button, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
