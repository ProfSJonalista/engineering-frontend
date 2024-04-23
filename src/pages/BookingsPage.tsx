import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import PaginatedTable from "../components/PaginatedTable";
import styles from "./BookingsPage.module.css";

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
  const [addBookingModalOpen, setAddModalBookingOpen] = useState(false);

  useEffect(() => {
    populateBookings();
  }, []);

  const toggleModal = useCallback(
    () => setAddModalBookingOpen(!addBookingModalOpen),
    [addBookingModalOpen]
  );

  return (
    <div>
      {responseOk === true && (
        <button className={styles.addBooking} onClick={toggleModal}>
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
      <Modal isOpen={addBookingModalOpen} onClose={toggleModal}>
        Booking modal
      </Modal>
    </div>
  );

  async function populateBookings() {
    const response = await fetch("http://localhost:3001/api/1/bookings");
    const data = await response.json();

    setBookings(data.data);
    setResponseOk(response.ok);
  }
}
