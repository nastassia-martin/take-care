import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./styles.module.scss";
type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps = {
  text: string;
  ariaLabel: ButtonAttributes["aria-label"];
  type: ButtonAttributes["type"];
};

const Button = ({ text, ariaLabel, type }: ButtonProps): ReactElement => {
  return (
    <button aria-label={ariaLabel} className={styles.Button} type={type}>
      {text}
    </button>
  );
};
export default Button;
