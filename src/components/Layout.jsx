import { useState } from "react";
import Authentication from "./Authentication";
import { Modal } from "./Modal";
import { useAuth } from "../context/AuthContext";

const Layout = (props) => {
  const { children } = props;
  const [showModal, setShowModal] = useState(false);

  const { globalUser, logout } = useAuth();
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">Caffeince</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ? (
        <button
          onClick={() => {
            logout(true);
          }}
        >
          <p>Logout</p>
          <i className="fa-solid fa-mug-hot" />
        </button>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fa-solid fa-mug-hot" />
          <p>Sign up free</p>
        </button>
      )}
    </header>
  );
  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffeince</span> was made by{" "}
        <a href="https://www.facebook.com/trinhngoc.sonn/" target="_blank">
          NOS
        </a>{" "}
        using the{" "}
        <a href="https://www.fantacss.smoljames.com/" target="_blank">
          FantaCSS
        </a>{" "}
        design library.
      </p>
    </footer>
  );
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;
