let box = document.querySelector('.container');
let feedback = document.querySelectorAll('.feedback');

feedback.forEach((item) => {
    item.addEventListener('click', (e) => {
        let feedbackType = '';
        let feedbackMessage = '';

        if(e.currentTarget.id === 'happy'){
            feedbackType = 'Unhappy';
            feedbackMessage = 'We\'re sorry to hear that you had a less than perfect experience. We\'ll work on improving our service.';
        } else if(e.currentTarget.id === 'neutral'){
            feedbackType = 'Neutral';
            feedbackMessage = 'We appreciate your input and will strive to make things even better.';
        } else if(e.currentTarget.id === 'satisfied'){
            feedbackType = 'Satisfied';
            feedbackMessage = 'We\'re thrilled that you had a great experience with us!';
        }

        box.innerHTML =`
        <div class="thank-you-message">
            <h2>Thanks for your feedback!</h2>
            <p>${feedbackMessage}</p>
            <p>Your Feedback: <strong>${feedbackType}</strong></p>
        </div>`;
    });
});
