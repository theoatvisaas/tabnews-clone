const status = (req, res) => {
  res.status(200).json({ status_message: "All systems operational" });
};

export default status;
