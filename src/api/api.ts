import { shuffleArray } from "../utils"

export interface iQuestion {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}


export interface iQuestionState extends iQuestion {
   answers: string[] 
}


export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuestions = async( amount: number, difficulty: Difficulty) => {
    //add to dotenv file
    
    const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    
    //fetch with axios
    // try {
        const data = await (await fetch(API)).json()

        return data.results.map((question: iQuestion)=>(
            {
                ...question,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        ))
    // } catch (err) {
    //     console.log(err)
    // }
   
}