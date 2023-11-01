const formatDate = (dateStr, timeStr) => {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const dateObj = new Date(dateStr);

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const [hours, minutes] = timeStr.split(":");

  return `${day} ${month} ${year} à ${hours}h${minutes}`;
};

module.exports = { formatDate };
