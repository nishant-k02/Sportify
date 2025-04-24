//delete reviews enpoint

const fs = require("fs");
const path = require("path");
async function deleteReviews(params) {
  (req, res) => {
    const { eventId, commentIndex } = req.body;

    try {
      const dataPath = path.join(__dirname, "data", "../data.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      const eventIndex = data.findIndex((e) => e.id === eventId);
      if (eventIndex === -1) {
        return res.status(404).json({ error: "Event not found" });
      }

      // Validate comment index
      if (
        !Array.isArray(data[eventIndex].reviews) ||
        commentIndex < 0 ||
        commentIndex >= data[eventIndex].reviews.length
      ) {
        return res.status(400).json({ error: "Invalid comment index" });
      }

      // Remove the comment
      data[eventIndex].reviews.splice(commentIndex, 1);

      // Write updated data back
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.error("Error deleting comment:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
//bulk delete reviews endpoint
async function bulkDeleteComments(req, res) {
  const { selectedComments } = req.body;

  try {
    const dataPath = path.join(__dirname, "data", "../data.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const grouped = {};
    selectedComments.forEach(({ eventId, commentIndex }) => {
      if (!grouped[eventId]) grouped[eventId] = [];
      grouped[eventId].push(commentIndex);
    });

    for (const eventId in grouped) {
      const idx = data.findIndex((e) => e.id === parseInt(eventId));
      if (idx !== -1 && Array.isArray(data[idx].reviews)) {
        grouped[eventId].sort((a, b) => b - a);
        grouped[eventId].forEach((commentIndex) => {
          if (data[idx].reviews[commentIndex]) {
            data[idx].reviews.splice(commentIndex, 1);
          }
        });
      }
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Comments deleted successfully" });
  } catch (err) {
    console.error("Bulk delete error:", err);
    return res.status(500).json({ error: "Failed to delete comments" });
  }
}

module.exports = { deleteReviews, bulkDeleteComments };
