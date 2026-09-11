/* 서버 시각을 한국 날짜로 변환 */
export function getKoreaDate(dateValue) {
  const date = new Date(dateValue);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', //한국시간 사용
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year').value;
  const month = parts.find((part) => part.type === 'month').value;
  const day = parts.find((part) => part.type === 'day').value;

  return `${year}-${month}-${day}`;
}

/* 이번 주 월~일과 서버 조회 기간 */
export function getCurrentWeek(now = new Date()) {
  const today = getKoreaDate(now);
  const monday = new Date(`${today}T00:00:00Z`); //날짜 계산용 객체를 만듦
  const day = monday.getUTCDay(); // 일(0)~토(6) 요일로 숫자를 줌
  const daysFromMonday = (day + 6) % 7; //월요일부터 지난 일수 구함

  monday.setUTCDate(monday.getUTCDate() - daysFromMonday); //월요일로 이동

  const dates = []; //월~일 날짜 보관

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(monday); //월요일 날짜 복사
    date.setUTCDate(monday.getUTCDate() + index); // 해당요일 이동
    dates.push(date.toISOString().slice(0, 10)); //날짜 부분만 저장
  }

  return {
    dates, // 월요일부터 일요일까지의 날짜 목록
    startDate: dates[0], // 시작일을 YYYY-MM-DD 형식으로 전달
    endDate: dates[6], // 종료일을 YYYY-MM-DD 형식으로 전달
  };
}
