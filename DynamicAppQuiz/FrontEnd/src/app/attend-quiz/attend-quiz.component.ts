import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'
@Component({
  selector: 'app-attend-quiz',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './attend-quiz.component.html',
  styleUrls: ['./attend-quiz.component.css']
})
export class AttendQuizComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: string]: string } = {};
  timeLimit: number = 600; // Time limit in seconds (e.g., 10 minutes)
  timer: any;
  timeLeft: number=0;
  username: string='';
  constructor(private route: ActivatedRoute,private quizService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.fetchQuizData();
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.loadAssignedQuizzes();
    });
  }
  loadAssignedQuizzes() {
    this.quizService.getAssignedQuizzesByUsername(this.username)
      .subscribe((quizzes: any[]) => {
        this.questions = quizzes;
        if (this.questions.length === 0) {
          alert('No quizzes assigned.');
          this.router.navigate(['/homeStud'], { queryParams: { u_name: this.username } });
        
        }
      });
  }

  fetchQuizData() {
    this.quizService.getQuizData1().subscribe(
      (data: any[]) => {
        this.questions = data;
        this.initializeSelectedAnswers();
        this.startTimer();
      },
      (error: any) => {
        console.error('Error fetching quiz data:', error);
      }
    );
  }

  initializeSelectedAnswers() {
    this.questions.forEach(question => {
      this.selectedAnswers[question._id] = '';
    });
  }

  selectAnswer(questionId: string, selectedOption: string) {
    this.selectedAnswers[questionId] = selectedOption;
  }

  startTimer() {
    this.timeLeft = this.timeLimit;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.timer); 
        this.submitQuiz();
      }
    }, 1000);
  }

  
    submitQuiz() {
      clearInterval(this.timer); // Stop the timer
    
      let totalMarks = 0;
    
      // Iterate through questions to compare answers
      this.questions.forEach(question => {
        const correctAnswer = question.correctOption;
        const userAnswer = this.selectedAnswers[question._id];
    
        // Check if user answer is correct
        if (userAnswer === correctAnswer) {
          totalMarks++;
        }
      });
    
      // Calculate percentage of correct answers
      const percentage = (totalMarks / this.questions.length) * 100;
    
      // Display marks as an alert
      alert(`You scored ${totalMarks} out of ${this.questions.length}. Percentage: ${percentage.toFixed(2)}%`);
      this.router.navigate(['/homeStud'], { queryParams: { u_name: this.username } });
    }

    
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}