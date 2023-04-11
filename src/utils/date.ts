function addZero(num: number){
  if (num <= 9) 
      return "0" + num;
  else
      return num; 
};

export function formatDate(date: Date) {
  return (
    addZero(date.getDate()).toString() + "/" +
    addZero(date.getMonth()+1).toString() + "/" + 
    date.getFullYear() + "\t" +
    addZero(date.getHours()) + "h" +
    addZero(date.getMinutes())
  );
}