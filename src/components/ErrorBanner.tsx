import styles from "./ErrorBanner.module.css";

interface Props {
  show: boolean;
}

export default function ErrorBanner({ show }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.root}>
      There was an issue on the server. Please reload the page or try again
      later.
    </div>
  );
}
