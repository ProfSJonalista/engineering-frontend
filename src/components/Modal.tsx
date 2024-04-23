import styles from "./Modal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      {isOpen && (
        <div>
          <div className={styles.background} onClick={onClose} />
          <div className={styles.container}>
            <div className={styles.controls}>
              <button
                className={styles.overlay__close}
                type="button"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
