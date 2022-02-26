import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NumberValidatorDirective } from '../directives/numberValidator.directive';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  @ViewChild('contactus') contactus :ElementRef
  @ViewChild('about') aboutus :ElementRef
  @ViewChild('home') home :ElementRef
  Address='A.B Road Near Aakar IAS Coaching Classes Bhola Ram Gate , Bhavarkua,Indore(M.P.) 452001'
  ContactUSDetails:FormGroup = new FormGroup({})
  facilitiesList:any[]=[]  
  aboutUs: any[];
  displaySideBar = false
  ImagesUrl:any=[]
  TC=[]
  title=''
  hidemain=false
  hideAboutus=false
  overlays: any[];
  images:any[]
  userDetails:any={}
  displaygallery=false
  constructor(private app:AppService,private messageService:MessageService) {
    // console.log(this.userDetails);

      if(localStorage.getItem('id')){
        this.getUser()
      }
   }
  getUser(){
    this.app.getuserDetail(localStorage.getItem('id')).subscribe(res=>{
      this.userDetails = res
    })
  } 
  ngOnInit() {

    this.images= [
      {}
    ]
    this.ContactUSDetails = new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone:new FormControl(null,[Validators.required,NumberValidatorDirective.checkLimit(1000000000,10000000000)]),
      message:new FormControl(null,Validators.required),
    })

    this.app.getFacilities().subscribe(res=>{
      // console.log(res);
      
      this.facilitiesList = res['Facilities']
    })
    this.app.getAbout().subscribe(res=>{
      // console.log(res);
      
      this.aboutUs = res['AboutUs']
    })
  }
  contactUsSubmit(){
    console.log(this.ContactUSDetails.value);
    
  }
  legalClick(purpose){

  }
  logout(){
    localStorage.clear();
    this.messageService.add({severity:'success', summary: 'Logout Successfully', detail: ''});
    this.userDetails={}
  }
  click(purpose) {
    if(purpose=='about'){
      this.aboutus.nativeElement.scrollIntoView();
    }
    else if(purpose=='contact')
    this.contactus.nativeElement.scrollIntoView();
    else if(purpose=='home')
    this.home.nativeElement.scrollIntoView();
    else if(purpose=='bookSeat')
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Book Seat Feature is Coming Soon..'});
    else if(purpose=='gallery')
    this.displaygallery=true
    
    this.displaySideBar=false
}
responsiveOptions:any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];
}
