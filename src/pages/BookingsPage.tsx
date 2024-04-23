import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PaginatedTable from "../components/PaginatedTable";

interface Booking {
  id: string;
  bookingdate: string;
  comments: string;
  user: string;
  parc: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>();
  const [responseOk, setResponseOk] = useState<boolean | undefined>();

  useEffect(() => {
    populateBookings();
  }, []);

  return (
    <div>
      {responseOk === true && (
        <button onClick={() => alert("implement add booking")}>
          Add booking
        </button>
      )}
      <PaginatedTable
        columnNames={["ID", "User ID", "Parc ID", "Booking date", "Comments"]}
        data={bookings}
        responseOk={responseOk}
        mapData={(b) => {
          return (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user}</td>
              <td>{b.parc}</td>
              <td>{dayjs(b.bookingdate).format("DD MMMM YYYY hh:mm:ss")}</td>
              <td>{b.comments}</td>
            </tr>
          );
        }}
      />
    </div>
  );

  async function populateBookings() {
    const response = await fetch("http://localhost:3001/api/1/bookings");
    const data = await response.json();

    setBookings(data.data);
    setResponseOk(response.ok);
  }
}
