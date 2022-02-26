import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
// import { DataService } from '../services/Data/Data.service';
// import firebase from 'firebase/app';
import { Location } from '@angular/common';

import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NumberValidatorDirective } from '../directives/numberValidator.directive';
import { AppService } from '../service/app.service';
// import { AngularFireStorage } from "@angular/fire/storage";
@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.scss'], 
    providers: [MessageService,ConfirmationService]
})
export class StaffManageComponent implements OnInit {
 url  = environment.url
  productDialog: boolean;
  loading1=true
  products: any[];
  loading=true
  fileToUpload: File | null = null;
  downloadURL:any;
  
  image
  staffDetail :FormGroup = new FormGroup({})

  constructor(private location:Location,private appService:AppService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
  config:any;
  secondaryApp;
  ngOnInit() {
    this.loading=false
    this.staffDetail = new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      fatherName:new FormControl(null),
      address:new FormControl(null),
      image:new FormControl(null),
      salary:new FormControl(null),
      aadharNo:new FormControl(null,[ NumberValidatorDirective.checkLimit(100000000000, 1000000000000),]),
      phone:new FormControl(null,[Validators.required,  NumberValidatorDirective.checkLimit(1000000000, 10000000000),]),
      dob:new FormControl(null,Validators.required),
      
    })
    this.appService.getStaff().subscribe((res:any)=>{this.products=res.detail;this.loading=false ;this.loading1=false});
    //   this.products = [{name:'yash',salary:'10000',email:'jainyash041@gmail.com',mobile:'9630288239'},{name:'Charu',salary:'11000',email:'charuu@gmail.com',mobile:'8975875478'}]
    //    this.config = {apiKey: "AIzaSyDcr8IRk0wXcGv9XlV-diqM5zaNOaWNkGs",
    //   authDomain: "studyhome-d54cb.firebaseapp.com",
    // };
    // this.secondaryApp = firebase.initializeApp(this.config, "two");
  }

  openNew() {
      // this.staffDetail={name:null,email:null,mobile:null,salary:null,profile:null};
      this.staffDetail.reset()
      this.productDialog = true;
      this.isedit=false
      this.userId=''
  }

  dosomething()
  {
      this.loading1=false
  } 
 isedit=false
 userId:any=''
  editProduct(data: any) {
this.userId = data?._id
    // this.fileToUpload = product.name
    this.image=data.image
    this.isedit=true
      this.staffDetail.patchValue({
        name:data?.name,
        email:data?.email,
        fatherName:data?.fatherName,
        address:data?.address,      
        salary:data?.salary,
        // image:data?.image,
        aadharNo:data?.aadharNo,
        phone:data?.phone,
        dob:data?.dob,
      });
      this.productDialog = true;
  }

  deleteProduct(product: any) {
    console.log(product);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.appService.deleteStaff(product).subscribe((res:any)=>{
        
          if(res.message=='Deleted Successfully')
          {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});

           setTimeout(() => {
           // // this.onBackPress()
         window.location.reload()
   
           }, 1000);
   
          }
           else
           this.messageService.add({
             severity: 'error',
             summary: 'Failed To Updated',
             detail: '',
           });
        })
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
   
  }

  hideDialog() {
      this.productDialog = false;
  }
  uploadedPath:any=''
  handleFileInput(files: any) {
    if(!this.isedit){
      let fd = new FormData()
      this.fileToUpload=files.target.files.item(0)
      fd.append('id',this.userId)
      fd.append('image',this.fileToUpload,this.fileToUpload.name)
     this.appService.uploadImage(fd).subscribe((res:any)=>{
             this.messageService.add({
              severity: 'success',
              summary: 'Profile Pic Uploaded',
            });
  
        this.uploadedPath=res.image
  
      })
    }
    else{
      let fd = new FormData()
      this.fileToUpload=files.target.files.item(0)
      fd.append('id',this.userId)
      fd.append('image',this.fileToUpload,this.fileToUpload.name)
     this.appService.updateImage(fd).subscribe((res:any)=>{
             this.messageService.add({
              severity: 'success',
              summary: 'Profile Pic Uploaded',
            });
  
        this.uploadedPath=res.image
  
      })
    }
}
  saveProduct() {
    // console.log(this.fileToUpload);
    
    if(!this.isedit){
      this.loading=true
      // this.hideDialog()
      let data = {
        role:'staff',
        // regNo:res['regNo']+1,
        // id:this.userId,
        name:this.staffDetail.get('name')?.value,
        password:(this.staffDetail.get('phone')?.value).toString(),
        email:this.staffDetail.get('email')?.value,
        salary:this.staffDetail.get('salary')?.value,
        image:this.uploadedPath,
        aadharNo:this.staffDetail.get('aadharNo')?.value,
        dob:this.staffDetail.get('dob')?.value,    
        address:this.staffDetail.get('address')?.value,
        fatherName:this.staffDetail.get('fatherName')?.value,
        phone:this.staffDetail.get('phone')?.value,
      }
      this.appService.addStaff(data).subscribe((res:any)=>{
        // console.log(res);
        this.loading=false  
        if(res.message=='Added Successfully')
       {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Updated',
          detail: '',
        });
        setTimeout(() => {
        // // this.onBackPress()
      window.location.reload()

        }, 1000);

       }
        else
        this.messageService.add({
          severity: 'error',
          summary: 'Failed To Updated',
          detail: '',
        });
        
      })
        }
    else{
      this.loading=true
      let data = {
        role:'staff',
        // regNo:res['regNo']+1,
        id:this.userId,
        name:this.staffDetail.get('name')?.value,
        password:(this.staffDetail.get('phone')?.value).toString(),
        email:this.staffDetail.get('email')?.value,
        salary:this.staffDetail.get('salary')?.value,
        // image:this.uploadedPath,
        aadharNo:this.staffDetail.get('aadharNo')?.value,
        dob:this.staffDetail.get('dob')?.value,    
        address:this.staffDetail.get('address')?.value,
        fatherName:this.staffDetail.get('fatherName')?.value,
        phone:this.staffDetail.get('phone')?.value,
      }
      this.appService.updateStaff(data).subscribe((res:any)=>{
        // console.log(res);
        this.loading=false  
        if(res.message=='Updated Successfully')
       {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Updated',
          detail: '',
        });

        setTimeout(() => {
        // this.onBackPress()
      window.location.reload()
        }, 1000);
       }
        else
        this.messageService.add({
          severity: 'error',
          summary: 'Failed To Updated',
          detail: '',
        });
        
      })
    }
      
    }
    onBackPress(){
      this.location.back();
    }
    
}
