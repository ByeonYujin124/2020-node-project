const singer = {
    name: "2PM",
    members: ["준호","찬성","택연","준케이","우영","닉쿤"],
    songs: {
        song: [
            {
                title: "우리집",
                year: 2016
            },
            {
                title: "I'm your man",
                year: 2015
            }
        ]
    }
}

// JSON object -> string (http, tcp/ip -> string)
const str = JSON.stringify(singer);    // 객체 -> 문자열 생성
console.log(str);
console.log(typeof str);

const obj = JSON.parse(str);        // 문자열 -> 객체 생성
console.log(obj);
console.log(typeof obj);

console.log(obj.songs.song[0].title);   // 너 그리고 나 출력
console.log(obj.songs.song[1].year);    // 2015 출력no
