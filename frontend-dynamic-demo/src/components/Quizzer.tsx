'use client'

import React, {useEffect, useState} from 'react';

interface Option {
    id: number;
    label: string;
}

interface Question {
    id: number;
    label: string;
    options: Option[];
}

const list1Options: Option[] = [
    { id: 1, label: 'Teatotal Food Beverage' },
    { id: 2, label: 'Time to First Beer' },
    { id: 3, label: 'Time to First Byte' }
];
const list2Options: Option[] = [
    { id: 1, label: 'Frontend Change Painter' },
    { id: 2, label: 'Fall Coors Pabst' },
    { id: 3, label: 'First Contentful Paint' }
];
const defaultQuestions: Question[] = [
    { id: 1, label: 'Question 1: What does TTFB mean?', options: list1Options },
    { id: 2, label: 'Question 2: What is FCP?', options: list2Options }
]
const Quizzer: React.FC = () => {
    const [selectedList1, setSelectedList1] = useState<number>();
    const [selectedList2, setSelectedList2] = useState<number>();
    const [questions, setQuestions] = useState<Question[]>(defaultQuestions);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://backend.dsdemo.valesordev.com/quiz/questions');
                if(!response.ok) {
                    console.error(response.statusText);
                    return;
                }
                const result = await response.json();
                setQuestions(result.questions);
            } catch(error) {
                console.error(error);
            }
        };
        fetchQuestions();
    }, []);
    const handleRadioChange = (listNumber: number, optionId: number) => {
        if (listNumber === 1) {
            setSelectedList1(optionId);
        } else if (listNumber === 2) {
            setSelectedList2(optionId);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = {
            list1Selected: selectedList1,
            list2Selected: selectedList2,
        };

        try {
            const response = await fetch('http://backend.dsdemo.valesordev.com/quiz/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            if(!response.ok) {
                console.error(response.statusText);
                return false;
            }
            const result = await response.json();
            console.log(result.message);
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    };

    return (
        <div>
            <form id="quizForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">Your Name:</label><br/>
                    <input type="text" id="userName" name="userName"/><br/>
                </div>

                {questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.label}</p>
                        {question.options.map((option) => (
                            <label key={option.id}>
                                <input type={"radio"}
                                       name={"question" + question.id}
                                       value={option.id}
                                       onChange={() => handleRadioChange(question.id, option.id)}
                                       checked={selectedList1 === option.id} />
                                {option.label}
                            </label>
                        ))}
                    </div>
                ))}

                <button type="button">Submit</button>
            </form>
        </div>
    );
}

export default Quizzer;
