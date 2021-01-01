import React from 'react'
import { AnswerObject } from '../App'

interface IQuestionCard{
	question: string;
	answers: string[];
	callback: (e:React.MouseEvent<HTMLButtonElement>)=>void;
	userAnswer: AnswerObject | undefined;
	questionNr:number;
	totalQuestions: number;
}

//how are types passed in method arguments?
//how are types passed to react props specifically
//maybe see how the same would be happening for sth like a class maybe, idk

const QuestionCard : React.FC<IQuestionCard> = ({question,answers,callback,userAnswer,questionNr,totalQuestions}) => {
	return <div>
		<p className="number">Question : {questionNr} / {totalQuestions}</p>
		<p dangerouslySetInnerHTML={{__html: question}}/>
		<div>
			{answers.map(answer=><div>
					<button disabled={Boolean(userAnswer)} onClick={callback} value={answer}>
						<span dangerouslySetInnerHTML={{__html: answer}}/>
					</button>
				</div>)
			}</div> 
	</div>
}

export default QuestionCard