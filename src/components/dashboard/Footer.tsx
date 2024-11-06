import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <div className="bg-dark text-light p-3 text-center">
        &copy; All right reserved 2024 || made by{" "}
        <a
          href="https://sachinnagila.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sachin
        </a>
      </div>
    </>
  );
};

export default Footer;
