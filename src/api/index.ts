import  { shuffleArray } from '../utils'


export type Question = {
	category:string;
	correct_answer:string;
	difficulty:string;
	incorrect_answers:string[];
	question:string;
	type:string;
}

/*learnt that we can extend any type using the syntax that is displayed below,
	however, we cannot do the same thing for the interface extension
	Another thing to take note here is it is the bitwise & operator that is used not the logical and
	Another interesting thing to notice is that if there is a single arg and we are not intriducing 
	the brackets around the arg, then the type statement is not working.. interesting?
*/

export type QuestionState = Question & { answers: string[]}

export enum Difficulty{
	EASY = "easy",
	MEDIUM= "medium",
	HARD= "hard"
}

export const fetchQuizQuestions = async(amount:number,difficulty:Difficulty)=>{ 
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question:Question) =>{
		return {
			...question,
			answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
		}
	})
}