import React,{useState} from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuestionState } from './api';
import {GlobalStyle} from './App.styles'


const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
	question:string;
	answer:string;
	correct:boolean;
	correctAnswer:string;
}

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number,setNumber] = useState(0);
	const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
	const [score,setScore] = useState(0);
	const [gameOver,setGameOver] = useState(true)

	const startTrivia = async ()=>{
		setGameOver(false);
		setLoading(true);
		let newQuestions = []; 
		try{
			newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY);		
		}catch(err){
			console.log(err,"this is the error")
		}
		console.log(newQuestions,"this is the newQuestions")
	
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	}

	const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
		if(gameOver) return;
		const answer = e.currentTarget.value;
		const correct = questions[number].correct_answer === answer;
		if(correct) setScore((prev)=>prev + 1)
		
		const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			}
		setUserAnswers(prev=>[...prev,answerObject])
		
	}

	const nextQuestion = ()=>{
		const nextQuestion = number + 1;
		if (nextQuestion===TOTAL_QUESTIONS) setGameOver(true)
		setNumber(nextQuestion)
	}



  return (
		<>
		<GlobalStyle/>
    <div className="App">
      <h1>Quiz</h1>
			{(gameOver || userAnswers.length===TOTAL_QUESTIONS) && <button className="start" onClick={startTrivia}>Start</button>}
			{!gameOver && <p className="score">Score : {score}</p>}
			{loading && <p>Loading questions...</p>}
			{!loading && !gameOver ? questions.length ?  
				<QuestionCard
				questionNr={number + 1}
				totalQuestions={TOTAL_QUESTIONS}
				question={questions[number].question}
				answers={questions[number].answers}
				userAnswer={userAnswers ? userAnswers[number] : undefined}
				callback={checkAnswer}		
				/> : "failed to fetch resources" : null
			}
			{
			!gameOver && !loading && (userAnswers.length === number+1) && (number+1 !== TOTAL_QUESTIONS) && <button className='next' onClick={nextQuestion}>Next Question</button>
			}
    </div>
	</>
  );
}

export default App;
