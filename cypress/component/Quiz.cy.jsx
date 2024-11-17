import Quiz from "../../client/src/components/Quiz";
import mockQuestion from "../fixtures/questions.json";
import "@testing-library/cypress/add-commands";

describe("Tech Quiz Component Testing", () => {
  context("Quiz setup", () => {
    beforeEach(() => {
      // Intercept the GET request to /api/questions/random and reply with the mockQuestion fixture data
      cy.intercept("GET", "/api/questions/random", (req) => {
        req.reply({
          statusCode: 200,
          body: mockQuestion,
        });
      }).as("getRandomQuestion");

      // Mount the Quiz component for each test
      cy.mount(<Quiz />);
    });

    it("should start the quiz and display the first question", () => {
      // Click the 'Start Quiz' button
      cy.get(`[data-cy=start-quiz]`).contains("Start Quiz").click();

      // Wait for the API call to complete and render the first Question
      cy.wait("@getRandomQuestion");

      // Verify the first Question, numbered selection buttons, and provided Answers text are rendered
      cy.get(`[data-cy=question]`).should("contain", mockQuestion[0].question);
      mockQuestion[0].answers.forEach((answer, index) => {
        cy.get(`[data-cy=answer-btn-${index}]`).should("contain", index + 1);
        cy.get(`[data-cy=answer-text-${index}]`).should("contain", answer.text);
      });
    });

    it('should answer questions and complete the quiz', () => {
      cy.mount(<Quiz />);
      cy.get('button').contains('Start Quiz').click();
    
      // Answer questions
      cy.get('button').contains('1').click();
      cy.get('button').contains('3').click();
    
      // Log to see if alert-success is appearing
      cy.get('body').then(($body) => {
        if ($body.find('.alert-success').length) {
          console.log('.alert-success found');
        } else {
          console.log('.alert-success not found');
        }
      });
    
      // Check if the success message appears
      cy.get('.alert-success', { timeout: 5000 }).should('be.visible').and('contain', 'Your score');
    });
    
    
    
    it("should restart the quiz after completion", () => {
      // Click the 'Start Quiz' button, answer the questions and complete the quiz
      cy.get(`[data-cy=start-quiz]`).contains("Start Quiz").click();
      cy.wait("@getRandomQuestion");
      cy.get(`[data-cy=answer-btn-1]`).click();
      cy.get(`[data-cy=answer-btn-3]`).click();

      // Click the 'Take New Quiz' button
      cy.get(`[data-cy=take-new-quiz]`).click();

      // Verify the first Question is rendered again
      cy.get(`[data-cy=question]`).should("contain", mockQuestion[0].question);
    });
  });
});

