import styles from "./ErrorBanner.module.css";

interface Props {
  message?: string;
  show: boolean;
}

export default function ErrorBanner({ message, show }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.root}>
      {message ??
        "There was an issue on the server. Please reload the page or try again later."}
    </div>
  );
}
