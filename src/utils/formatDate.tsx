export const formatDateByDayName = (dateString:string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];

  return `${day}일 ${dayName}요일`;
}

export const formatDateByDay = (dateString:string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

export const formatFullDate = (dateString:string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

export const formatTime = (dateString:string) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}