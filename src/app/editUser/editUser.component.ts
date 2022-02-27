import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberValidatorDirective } from '../directives/numberValidator.directive';
import { Location } from '@angular/common';
import { AppService } from '../service/app.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {
  editUser :FormGroup = new FormGroup({})
  userId=''
  constructor(private location:Location,private app:AppService,private messageService:MessageService,private route: ActivatedRoute) { }
  image=''
  url=environment.url
  ngOnInit() {
    this.route.params.subscribe(res=>{
      // console.log(res.id);
       
      this.userId = res["id"];
      // console.log(this.userId);
      
   this.app.getuserDetail(this.userId).subscribe((res:any)=>{
    //  console.log(res);
    this.image=res.image
    console.log(this.image);
    
     this.patchValue(res)
   })
    })
    
  
    this.editUser = new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      fatherName:new FormControl(null),
      address:new FormControl(null),
      image:new FormControl(null),
      course:new FormControl(null),
      aadharNo:new FormControl(null,[ NumberValidatorDirective.checkLimit(100000000000, 1000000000000),]),
      phone:new FormControl(null,[Validators.required,  NumberValidatorDirective.checkLimit(1000000000, 10000000000),]),
      dob:new FormControl(null,Validators.required),
      
    })
  }
  uploadedPath=''
  fileToUpload: File | null = null;
  // path=''
  handleFileInput(files: any) {
    // console.log(files.target.files);
  let fd = new FormData()
    this.fileToUpload=files.target.files.item(0)
    console.log(this.image);
    
    fd.append('id',this.userId)
    fd.append('path',this.image)
    fd.append('image',this.fileToUpload,this.fileToUpload.name)
   this.app.updateImage(fd).subscribe((res:any)=>{
           this.messageService.add({
            severity: 'success',
            summary: 'Profile Pic Updated',
            // detail: 'Reg No. :'+  res['regNo']+1,
          });
      // console.log(res);
      this.uploadedPath=res.image
          window.location.reload()
    //    this.addUser.patchValue({
    //     image:res.image
    // }) 
    })
    // this.addUser.patchValue({
    //     image:files.target.files.item(0)
    // }) 
    // console.log(this.addUser.value);
    
}
  patchValue(data){
    this.editUser.patchValue({
      name:data?.name,
      email:data?.email,
      fatherName:data?.fatherName,
      address:data?.address,
      
      course:data?.course,
      aadharNo:data?.aadharNo,
      phone:data?.phone,
      dob:data?.dob,
    })
  }
  onBackPress(){
    this.location.back();
  }
  
  onSubmit(){
    // console.log(this.userId);
   
    let data = {
      // role:'staff',
      // regNo:res['regNo']+1,
      id:this.userId,
      name:this.editUser.get('name')?.value,
      password:(this.editUser.get('phone')?.value).toString(),
      email:this.editUser.get('email')?.value,
      course:this.editUser.get('course')?.value,
      // image:this.uploadedPath,
      aadharNo:this.editUser.get('aadharNo')?.value,
      dob:this.editUser.get('dob')?.value,    
      address:this.editUser.get('address')?.value,
      fatherName:this.editUser.get('fatherName')?.value,
      phone:this.editUser.get('phone')?.value,
    }
    this.app.editUser(data).subscribe((res:any)=>{
      // console.log(res);
      if(res.message=='Updated Successfully')
     {
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully Updated',
        detail: '',
      });
      setTimeout(() => {
      this.onBackPress()
      }, 2000);
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
