import styles from './PaginatedTable.module.css';

interface Props {
  columnNames: string[];
  data: any[] | undefined;
  mapData: (d: any) => React.ReactNode;
}

export default function PaginatedTable({ columnNames, data, mapData }: Props) {
  return (
    <div className={styles.scroll}>
      <table>
        <thead>
          <tr>
            {columnNames.map((cn, index) => {
              return <th key={index}>{cn}</th>;
            })}
          </tr>
        </thead>
        <tbody>{data?.map(mapData)}</tbody>
      </table>
    </div>
  );
}
