
export interface iDifficulty {
    EASY: 'easy'
    MEDIUM: 'medium'
    HARD: 'hard'
}

export const fetchQuestions = async( amount: number, difficulty: iDifficulty) => {
    //add to dotenv file
    const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    
    //fetch with axios
    const data = await (await fetch(API)).json()
    console.log(data)
}