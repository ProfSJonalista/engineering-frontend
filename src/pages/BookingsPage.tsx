import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import PaginatedTable from "../components/PaginatedTable";
import styles from "./BookingsPage.module.css";
import ErrorBanner from "../components/ErrorBanner";

interface Booking {
  id: string;
  bookingdate: string;
  comments: string;
  user: string;
  parc: string;
}

const URL = "http://localhost:3001/api/1/bookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>();
  const [responseOk, setResponseOk] = useState<boolean | undefined>();
  const [submitResponseOk, setSubmitResponseOk] = useState<
    boolean | undefined
  >();

  const [addBookingModalOpen, setAddModalBookingOpen] = useState(false);

  useEffect(() => {
    populateBookings();
  }, []);

  const toggleModal = useCallback(
    () => setAddModalBookingOpen(!addBookingModalOpen),
    [addBookingModalOpen]
  );

  const handleSubmit = useCallback(async () => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          id: crypto.randomUUID(),
          parc: crypto.randomUUID(),
          user: crypto.randomUUID(),
          bookingdate: Date.now.toString(),
          comment: "random comment",
        },
      ]),
    });

    setSubmitResponseOk(response.ok);
    populateBookings();
    toggleModal();
  }, [setSubmitResponseOk, toggleModal]);

  console.log("length", bookings?.length);

  return (
    <div>
      <ErrorBanner
        message="There was an error submitting a booking. Please try again later."
        show={submitResponseOk === false}
      />
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
      <Modal
        isOpen={addBookingModalOpen}
        onClose={toggleModal}
        onSubmit={handleSubmit}
      >
        Are you sure you want to add new booking?
      </Modal>
    </div>
  );

  async function populateBookings() {
    const response = await fetch(URL);
    const data = await response.json();

    setBookings(data.data);
    setResponseOk(response.ok);
  }
}
