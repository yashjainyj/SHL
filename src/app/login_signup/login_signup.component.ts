import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Data, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { NumberValidatorDirective } from '../directives/numberValidator.directive';

// import { AuthServiceService } from '../auth/AuthService.service';
// import { Details,OPT } from '../modalClass/userDetails';

@Component({
  selector: 'app-login_signup',
  templateUrl: './login_signup.component.html',
  styleUrls: ['./login_signup.component.css'],
})
export class Login_signupComponent implements OnInit {
  @ViewChild('formbox') formBox: ElementRef;
  @ViewChild('body') body: ElementRef;
  @ViewChild('otp') otpshow: ElementRef;
  @ViewChild('otp1') otpshow1: ElementRef;
  @ViewChild('forgot') forgot: ElementRef;
  @ViewChild('content') abc: ElementRef;
  @ViewChild('loginButton') loginButton: ElementRef;
  details: any = [];
  url = '';
  loginDetail: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});
  forgotPass = [];
  check = true;
  otp21 = [];
  hide: boolean = false;
  togglePassword = false;
  dismiss() {
    // this.activeModal.dismiss();
  }
  loading: boolean = false;
  loading1: boolean = true;
  checkvalue = 'User';
  UserDetails = [];
  ProviderDetails = [];
  passwordIncorrect = false;
  userNotFound = false;
  show = true;
  change() {
    // console.log('k');
    this.passwordIncorrect = false;
  }
  constructor(
    public router: Router,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    // this.auth.authenticated
    this.url = environment.url;
  }
  // ngAfterViewInit(): void {
  //   console.log(this.otpshow1);
  // }
  get password() {
    return this.loginDetail.get('password')?.value;
  }
  get password1() {
    return this.signupForm.get('password')?.value;
  }
  showPass() {
    this.togglePassword = !this.togglePassword;
  }
  ngOnInit() {
    this.loading = false;
    this.loading1 = false;
    this.loginDetail = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        NumberValidatorDirective.checkLimit(1000000000, 10000000000),
      ]),
      password: new FormControl(null, Validators.required),
    });
    // this.auth.errmes.subscribe(res=>{
    //   if(res=='success'){
    //     this.messageService.add({severity:'success', summary: 'Reset Link is Send to Your Registered Mail ID'});

    //   }
    //   else if(res){
    //     this.passwordIncorrect=true
    //     this.messageService.add({severity:'error', summary: 'ohhhh!!!', detail: res});
    //   }
    // })
    // this.auth.loading.subscribe(res=>{
    //   console.log(res);
    //   this.loading=res
    // })
    // this.auth.loading1.subscribe(res=>{
    //   console.log(res);
    //   this.loading1=res
    // })
  }
  getChecked(c) {
    if (c) this.checkvalue = 'User';
    else this.checkvalue = 'Provider';
  }
  signUpFormshow() {
    this.formBox.nativeElement.classList.add('active');
    this.body.nativeElement.classList.add('active');
  }
  signInForm() {
    this.formBox.nativeElement.classList.remove('active');
    this.body.nativeElement.classList.remove('active');
  }
  onSubmit() {
    this.loading = true;
    let data = {
      username: this.loginDetail.get('email')?.value,
      password: this.loginDetail.get('password')?.value,
    };
    this.http.post(this.url + 'login', data).subscribe((res: any) => {
      if (res?.message == 'Login Success!!!') {
        localStorage.setItem('token', res?.token);
        localStorage.setItem('refreshToken', res?.refreshToken);
        localStorage.setItem('id', res?.id);
        switch (res?.role) {
          case 'student':
            this.router.navigate(['home']);
            break;
          case 'admin':
            this.router.navigate(['dashboard']);
            break;
          case 'staff':
            this.router.navigate(['dashboard']);
            break;
          default:
            break;
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res?.message,
        });
      }
      this.loading = false;
    });
    // this.auth.logincre(this.loginDetail.email,this.loginDetail.password)
  }
  onSignUpSubmit() {
    this.loading = true;
    let data = this.signupForm.value;
    data.role = 'student';
    this.http.post(this.url + 'register', data).subscribe((res: any) => {
      this.loading = false;
      if (res.message == 'Register Successfully') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res?.message,
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Login',
          detail: 'Click on Login button',
        });
        this.loginDetail.patchValue({
          email: this.signupForm.get('email').value,
          password: this.signupForm.get('password').value,
        });
        this.signInForm();
        // this.loginButton.nativeElement.click();
        this.loginButton.nativeElement.dispatchEvent(new Event('click'));

        // setTimeout(() => {
        // }, 2000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res?.message,
        });
      }
      // console.log(res);
    });
    // let otp = this.otp21.one+this.otp21.two+this.otp21.three+this.otp21.four+this.otp21.five+this.otp21.six
    // console.log(otp);
    // this.auth.signup({name:this.details.name,address:this.details.dob,contactNo:this.details.contactNo,email:this.details.email,password:this.details.password,role:'student'})
  }
  sendOtp(purpose) {
    if (purpose == 'forgot') {
      console.log('hy');
      this.otpshow1.nativeElement.style.display = 'flex';
    } else if (purpose == 'Register') {
      this.otpshow.nativeElement.style.display = 'flex';
    }
  }
  hideLogin = false;
  ForgotPasswordshow(content) {
    // this.auth.forgotPassword(content)
    // this.forgot.nativeElement.style.display='flex'
    // this.hideLogin=true
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md', windowClass: 'modal-xxl',centered: true}).result.then((result: any) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   }, (reason: any) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });
  }
  closeModal() {
    // this.modalService.dismissAll();
  }
  closeResult: string = '';
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
  ForgotPassword(f: NgForm) {
    this.loading = true;
    // const modalRef = this.modalService.open(, { size: dialogSize });
    // modalRef.componentInstance.title = title;
    // modalRef.componentInstance.message = message;
    // modalRef.componentInstance.btnOkText = btnOkText;
    // modalRef.componentInstance.btnCancelText = btnCancelText;

    // console.log(this.otp21);
    console.log(this.forgotPass);
    // let otp = this.otp21.one+this.otp21.two+this.otp21.three+this.otp21.four+this.otp21.five+this.otp21.six
    // console.log(otp);
    // this.forgot.nativeElement.style.display='none'
    f.resetForm();
  }
}
