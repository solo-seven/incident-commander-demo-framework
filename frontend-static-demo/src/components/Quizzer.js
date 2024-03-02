import React from 'react';

const Quizzer = () => {
    const checkAnswers = () => {
        const userName = document.getElementById('userName').value;
        const answer1 = document.querySelector('input[name="question1"]:checked').value;
        const answer2 = document.querySelector('input[name="question2"]:checked').value;

        if (answer1 !== '3' || answer2 !== '3') {
            alert(userName + ", your answers are incorrect!");
            throw new Error(userName + ", your answers are incorrect.");
        } else {
            alert(userName + ", your answers are correct!");
            return true;
        }
    }
    return (
        <div>
            <form id="quizForm">
                <label htmlFor="userName">Your Name:</label><br/>
                <input type="text" id="userName" name="userName"/><br/>

                <p>Question 1: What does TTFB mean??</p>
                <input type="radio" id="q1a1" name="question1" value="1"/>
                <label htmlFor="q1a1">Teatotal Food Beverage</label><br/>
                <input type="radio" id="q1a2" name="question1" value="2"/>
                <label htmlFor="q1a2">Time to First Beer</label><br/>
                <input type="radio" id="q1a3" name="question1" value="3"/>
                <label htmlFor="q1a2">Time to First Byte</label><br/>

                <p>Question 2: What is FCP?</p>
                <input type="radio" id="q2a1" name="question2" value="1"/>
                <label htmlFor="q2a1">Frontend Change Painter</label><br/>
                <input type="radio" id="q2a2" name="question2" value="2"/>
                <label htmlFor="q2a2">Fall Coors Pabst</label><br/>
                <input type="radio" id="q2a3" name="question2" value="3"/>
                <label htmlFor="q2a3">First Contentful Paint</label><br/>

                <button type="button" onClick={ checkAnswers }>Submit</button>
            </form>
        </div>
    );
}

export default Quizzer;