import { useState } from "react";
import styles from "./PaginatedTable.module.css";
import ErrorBanner from "./ErrorBanner";

interface Props {
  columnNames: string[];
  data: any[] | undefined;
  responseOk: boolean | undefined;
  mapData: (d: any) => React.ReactNode;
}

const itemsPerPage = 5;

export default function PaginatedTable({
  columnNames,
  data,
  responseOk,
  mapData,
}: Props) {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      <ErrorBanner show={responseOk === false} />
      {responseOk === true && (
        <>
          <div className={styles.scroll}>
            <table>
              <thead>
                <tr>
                  {columnNames.map((cn, index) => {
                    return <th key={index}>{cn}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data
                  ?.slice(startIndex, startIndex + itemsPerPage)
                  ?.map(mapData)}
              </tbody>
            </table>
          </div>
          {data?.length && data.length > 0 && (
            <div className={styles.buttons}>
              <button
                className={styles.previous}
                disabled={startIndex - itemsPerPage < 0}
                onClick={() => setStartIndex(startIndex - itemsPerPage)}
              >
                Previous
              </button>
              <span className={styles.counter}>
                Page {Math.ceil(startIndex / itemsPerPage + 1)} out of{" "}
                {Math.ceil(data.length / itemsPerPage)}
              </span>
              <button
                className={styles.next}
                disabled={startIndex + itemsPerPage >= data.length}
                onClick={() => setStartIndex(startIndex + itemsPerPage)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
