import ReactDOM from "react-dom";
export const Modal = (props) => {
  const { children, handleCloseModal } = props;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <button onClick={handleCloseModal} className="modal-underlay" />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
};
