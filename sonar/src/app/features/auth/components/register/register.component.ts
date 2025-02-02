import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    const { username, email, password, repeatPassword } = this.registerForm.value;

    const newUser: User = {
      id: null, // Leave blank if the backend generates the ID.
      username,
      email,
      password,
      repeatPassword,
      roles: ['ROLE_USER']
    };

    // this.store.dispatch(AuthActions.register({ username, email, password, repeatPassword }));
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
