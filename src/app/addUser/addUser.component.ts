import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NumberValidatorDirective } from '../directives/numberValidator.directive';
import { AppService } from '../service/app.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class AddUserComponent implements OnInit {
  addUser :FormGroup = new FormGroup({})
  slots:FormGroup = new FormGroup({})
  noOfSlot=0
  startTime: Date[]=[];
  endTime: Date[]=[];
  fileToUpload: File | null = null;

  constructor(public app:AppService,private location: Location,private messageService:MessageService) { }
  invoiceandRegNo:any={}
  ngOnInit() {
   

    this.addUser = new FormGroup({
      regNo:new FormControl(null,Validators.required),
      image:new FormControl(null),
      name:new FormControl(null,Validators.required),
      email:new FormControl(null),
      fatherName:new FormControl(null),
      address:new FormControl(null),
      course:new FormControl(null),
      aadharNo:new FormControl(null,[ NumberValidatorDirective.checkLimit(100000000000, 1000000000000),]),
      phone:new FormControl(null,[Validators.required,  NumberValidatorDirective.checkLimit(1000000000, 10000000000),]),
      dob:new FormControl(null,Validators.required),
      
    })
   
    this.slots = new FormGroup({
      startDate:new FormControl(null,Validators.required),
      endDate:new FormControl(null,Validators.required),
      dueDate:new FormControl(null),
      paymentMode:new FormControl(null),
      description:new FormControl(null),
      amount:new FormControl(null,Validators.required),
      // invoiceNo:new FormControl(null,Validators.required),
      invoiceDate:new FormControl(null,Validators.required),
      dueAmount:new FormControl(0,Validators.required),
      enrollmentAmount:new FormControl(0,Validators.required),
      discount:new FormControl(0,Validators.required),
      paidAmount:new FormControl(null,Validators.required),
      isActive:new FormControl("ACTIVE")     
    })
     this.app.getInvoiceAndReg().subscribe((res)=>{
      this.invoiceandRegNo=res
      this.addUser.patchValue({
        regNo: +this.invoiceandRegNo['regNo'] +1
      })
    })
  }
  uploadedPath=''
  handleFileInput(files: any) {
    // console.log(files.target.files);
  let fd = new FormData()
    this.fileToUpload=files.target.files.item(0)
    fd.append('image',this.fileToUpload,this.fileToUpload.name)
   this.app.uploadImage(fd).subscribe((res:any)=>{
           this.messageService.add({
            severity: 'success',
            summary: 'Profile Pic Uploaded',
          });

      this.uploadedPath=res.image

    })
 
    
}
  slotArray=[]
  change(){
    this.slotArray=[]
    for (let index = 0; index < this.noOfSlot; index++) {
      const startTime = this.startTime[index];
      const endTime = this.endTime[index];
      let time = startTime+ '-'+endTime
      this.slotArray.push(time)
      console.log(this.slotArray);
      
    }
  }
  get getStartDate(){
    return this.slots.get('startDate')?.value
  }
  onBackPress(){
    this.location.back();
  }

  onSubmit(){
    // this.app.getInvoiceAndReg().subscribe((res)=>{
    this.change()
    // console.log(new Date());
    
      let data = {
        role:'student',
        // regNo:res['regNo']+1,
        regNo:this.addUser.get('regNo')?.value,
        image:this.uploadedPath,
        name:this.addUser.get('name')?.value,
        password:(this.addUser.get('phone')?.value).toString(),
        email:this.addUser.get('email')?.value,
        course:this.addUser.get('course')?.value,
        aadharNo:this.addUser.get('aadharNo')?.value,
        dob:this.addUser.get('dob')?.value,    
        address:this.addUser.get('address')?.value,
        fatherName:this.addUser.get('fatherName')?.value,
        phone:this.addUser.get('phone')?.value,
        slots:{
          invoiceNo:this.invoiceandRegNo['invoiceNo']+1,
          invoiceDate:this.slots.get('invoiceDate')?.value,
          startDate: this.slots.get('startDate')?.value,
          amount: this.slots.get('amount')?.value,
          dueDate:this.slots.get('dueDate')?.value,
          paymentMode:this.slots.get('paymentMode')?.value,
          description:this.slots.get('description')?.value,
          paidAmount: this.slots.get('paidAmount')?.value,
          dueAmount: this.slots.get('dueAmount')?.value,
          discount: this.slots.get('discount')?.value,
          enrollmentAmount: this.slots.get('enrollmentAmount')?.value,
          endDate: this.slots.get('endDate')?.value,
          slotTiming:this.slotArray
        }
      }
      console.log(data);
      
      this.app.addUser(data).subscribe((res11)=>{
        if(res11['message']=='Added Successfully'){
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Added',
            detail: 'Reg No. :'+  this.addUser.get('regNo')?.value,
          });
          this.onBackPress()
        }
        else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res11['message'],
          });
        }
     
      })
    // })
  
  }
}
