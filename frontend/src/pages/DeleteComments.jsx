import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '../config/config';
import Navbar from "../components/Navbar";

const DeleteComments = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${config.API_URL}/apis/ai/events`);
      setEvents(res.data);
    };
    fetchData();
  }, []);

  const handleDeleteClick = (eventId, commentIndex) => {
    setSelectedComment({ eventId, commentIndex });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { eventId, commentIndex } = selectedComment;
      await axios({
        method: "delete",
        url: `${config.API_URL}/admin/delete-comment`,
        data: { eventId, commentIndex },
      });

      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                reviews: e.reviews.filter((_, i) => i !== commentIndex),
              }
            : e
        )
      );

      setShowModal(false);
      setSelectedComment(null);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post(`${config.API_URL}/admin/bulk-delete-comments`, {
        selectedComments,
      });

      const updated = events.map((event) => {
        const deletions = selectedComments
          .filter((sc) => sc.eventId === event.id)
          .map((sc) => sc.commentIndex);
        return {
          ...event,
          reviews: event.reviews?.filter((_, idx) => !deletions.includes(idx)),
        };
      });

      setEvents(updated);
      setSelectedComments([]);
      setSelectAll(false);
      setShowBulkModal(false);
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const isSelected = (eventId, commentIndex) =>
    selectedComments.some(
      (item) => item.eventId === eventId && item.commentIndex === commentIndex
    );

  const toggleSelect = (eventId, commentIndex) => {
    const selected = { eventId, commentIndex };
    setSelectedComments((prev) =>
      isSelected(eventId, commentIndex)
        ? prev.filter(
            (item) =>
              item.eventId !== selected.eventId ||
              item.commentIndex !== selected.commentIndex
          )
        : [...prev, selected]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedComments([]);
      setSelectAll(false);
    } else {
      const all = [];
      events.forEach((event) =>
        event.reviews?.forEach((_, index) =>
          all.push({ eventId: event.id, commentIndex: index })
        )
      );
      setSelectedComments(all);
      setSelectAll(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🗑️ Manage User Reviews
        </h1>

        {selectedComments.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowBulkModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete Selected ({selectedComments.length})
            </button>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
            <thead className="bg-[#f9fafb] sticky top-0 z-10">
              <tr>
                <th className="p-3 text-sm font-semibold text-center border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Post ID
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Post Title
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Comment
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Username
                </th>
                <th className="p-3 text-sm font-semibold text-center border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) =>
                event.reviews?.map((review, index) => (
                  <tr
                    key={`${event.id}-${index}`}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-3 text-sm text-center">
                      <input
                        type="checkbox"
                        checked={isSelected(event.id, index)}
                        onChange={() => toggleSelect(event.id, index)}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700">{event.id}</td>
                    <td className="p-3 text-sm text-gray-800 font-medium">
                      {event.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {review.comment}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {review.reviewer}
                    </td>
                    <td className="p-3 text-sm text-center">
                      <button
                        onClick={() => handleDeleteClick(event.id, index)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Single Delete Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-6 text-gray-700">
                This will permanently delete the selected comment.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
              <h2 className="text-lg font-semibold mb-4">
                Confirm Bulk Delete?
              </h2>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete <b>{selectedComments.length}</b>{" "}
                comments?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteComments;
