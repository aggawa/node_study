// 논블로킹 방식으로 작성한 코드
// 논블로킹 방식: 이전 작업이 끝나기를 기다리지 않고 다음작업 실행

// setTimeout(콜백함수, 0)을 사용하여 논블로킹 작업을 수행할 수 있다.
// 시간을 0으로 주면 즉시 실행함으로 다음 작업을 처리하면서 longRunningTask를 동시에 실행한다.

function longRunningTask() {
   // 오래 걸리는 작업
   console.log('작업끝')
}

console.log('시작')
setTimeout(longRunningTask, 0)
console.log('다음작업')
