import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent implements OnInit{
  usernames: string[] = [];
  groupname:string='';
  questions: { question: string, options: string[], correctOption: number }[] = [];
  question: string = '';
  options: string[] = ['', '', '', ''];
  correctOption: number = 0;
  u_name :string=''  

  constructor(private quizService: ApiService,private route: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usernames = Array.isArray(params['usernames']) ? params['usernames'] : [params['usernames']];
      this.u_name=params['staff']
    });
  }
  addQuestion() {
    this.questions.push({
      question: '',
      options: ['', '', '', ''],
      correctOption: 0
    });
  }

  onSubmit() {
    if (this.questions.length === 0) {
      alert('Please add at least one question before submitting.');
      return;
    }
    if (this.questions.some(question => question.question.trim() === '')) {
      alert('Please provide a question for all questions before submitting.');
      return;
    }
  
    // Check if any question has no options provided
    if (this.questions.some(question => question.options.some(option => option.trim() === ''))) {
      alert('Please provide options for all questions before submitting.');
      return;
    }
  
    // Check if any question has no correct option selected
    if (this.questions.some(question => question.correctOption === -1)) {
      alert('Please select a correct option for all questions before submitting.');
      return;
    }
     
    this.questions.forEach(question => {

      const quizData = {
        usernames: this.usernames,
        question: question.question,
        options: question.options,
        correctOption: question.options[question.correctOption]
      };
console.log(quizData);
      this.quizService.createQuiz(quizData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    });
    
    alert('Quiz Created Successfully')
    this.router.navigate(['/homeStaff'], { queryParams: { u_name: this.u_name } });

  }
}