import { useCallback } from "react";
import styles from "./Modal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  const submit = useCallback(() => {
    onSubmit();
    onClose();
  }, [onClose, onSubmit]);

  return (
    <>
      {isOpen && (
        <div>
          <div className={styles.background} onClick={onClose} />
          <div className={styles.container}>
            <div className={styles.content}>{children}</div>
            <div className={styles.controls}>
              <button onClick={onClose}>Cancel</button>
              <button onClick={submit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
