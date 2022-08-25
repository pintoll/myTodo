import mongoose from "mongoose";

const todaySchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true, },
    todayRecapIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Recap",
        default: [],
    }],
    feedbacks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
        default: [],
     }],
});

const Today = mongoose.model("Today", todaySchema);
export default Today;

// #TODO Today로 recap 다뤄버리기!(서버 Today(recap) update, today대로 goal과 recap 불러오기)
// 1. server 시간에 따른 today 업데이트
// 1) 다음날짜의 today를 불러온다(혹은 만든다)
// 2) 오늘 날짜의 today에서 check가 된 recap들은 index 숫자올리기, date다음걸로, check false로, delayed 0으로
// 3) check안된 recap은 dateTodo, date 전부 1일씩 추가(이때 각 today도 갱신해야겠죠?), delayed += 1, 다음 today에 delayed Recap으로 보내버리기
// 끄또!