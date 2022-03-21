export const timeForToday = (endDate: Date) => {
  const today = new Date();

  const betweenTime = Math.floor(
    (endDate.getTime() - today.getTime()) / 1000 / 60
  );
  const betweenTimeHour = Math.floor(betweenTime / 60);
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  return `${betweenTimeHour}`;
};
