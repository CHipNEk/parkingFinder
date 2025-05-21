import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router'; // Import Router from Angular Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzInputModule,]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Giả lập kiểm tra đăng nhập thành công
      if (email === 'bachh@gmail.com' && password === '123123') {
        alert('Đăng nhập thành công!');
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/home/dashboard']); // Chuyển hướng đến Dashboard
      } else {
        alert('Email hoặc mật khẩu không đúng!');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }
}