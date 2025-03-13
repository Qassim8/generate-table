export const formatTimeTo12Hour = (time) => {
  if (!time) return ""; // التحقق من أن القيمة ليست فارغة
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // تحويل 00:00 إلى 12:00 AM
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};
