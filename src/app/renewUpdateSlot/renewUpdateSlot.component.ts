import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-renewUpdateSlot',
  templateUrl: './renewUpdateSlot.component.html',
  styleUrls: ['./renewUpdateSlot.component.css'],
})
export class RenewUpdateSlotComponent implements OnInit {
  slots: FormGroup = new FormGroup({});
  slotArray = [];
  noOfSlot = 0;
  startTime: Date[] = [];
  endTime: Date[] = [];
  slotId = '';
  purpose = '';
  userId=''
  constructor(
    private route: ActivatedRoute,
    public app: AppService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res) => {
      // console.log(res.id);
      this.userId = res['userid']
      this.slotId = res['id'];
      this.purpose = res['purpose'];
      // console.log(this.userId);
      if (res['purpose'] == 'edit')
        this.app.getsingleSlot(this.slotId).subscribe((res: any) => {
          //  console.log(res);
          this.noOfSlot = res.slot.slotTiming.length;
          res.slot.slotTiming.forEach((element) => {
            this.startTime.push(new Date(element.split('-')[0]));
            this.endTime.push(new Date(element.split('-')[1]));
          });
          console.log(this.startTime);

          this.patchValue(res.slot);
        });
    });
    this.slots = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      dueDate:new FormControl(null),
      paymentMode:new FormControl(null),
      description:new FormControl(null),
      // invoiceNo:new FormControl(null,Validators.required),
      // invoiceDate:new FormControl(null,Validators.required),
      dueAmount: new FormControl(null, Validators.required),
      enrollmentAmount: new FormControl(0, Validators.required),
      discount: new FormControl(0, Validators.required),
      paidAmount: new FormControl(null, Validators.required),
      isActive: new FormControl('ACTIVE'),
    });
  }
  patchValue(data) {
    console.log(data);

    this.slots.patchValue({
      startDate: data?.startDate,
      endDate: data?.endDate,
      dueDate: data?.dueDate,
      paymentMode: data?.paymentMode,
      description: data?.description,
      amount: data?.amount,
      dueAmount: data?.dueAmount,
      enrollmentAmount: data?.enrollmentAmount,
      discount: data?.discount,
      paidAmount: data?.paidAmount,
      isActive:data?.isActive
      // dob:data?.dob,
    });
  }
  change() {
    this.slotArray = [];
    for (let index = 0; index < this.noOfSlot; index++) {
      const startTime = this.startTime[index];
      const endTime = this.endTime[index];
      let time = startTime + '-' + endTime;
      this.slotArray.push(time);
      console.log(this.slotArray);
    }
  }
  get getStartDate() {
    return this.slots.get('startDate')?.value;
  }
  onBackPress() {
    this.location.back();
  }
  onSubmit() {
    // console.log(new Date());
    // if (this.purpose == 'edit') {
    // this.change();

    //   let data = {
    //     id: this.slotId,
    //     slots: {
    //       // invoiceNo:res['invoiceNo']+1,
    //       // invoiceDate:new Date().toISOString(),
    //       startDate: this.slots.get('startDate')?.value,
    //       dueDate:this.slots.get('dueDate')?.value,
    //       paymentMode:this.slots.get('paymentMode')?.value,
    //       description:this.slots.get('description')?.value,
    //       amount: this.slots.get('amount')?.value,
    //       paidAmount: this.slots.get('paidAmount')?.value,
    //       dueAmount: this.slots.get('dueAmount')?.value,
    //       discount: this.slots.get('discount')?.value,
    //       enrollmentAmount: this.slots.get('enrollmentAmount')?.value,
    //       endDate: this.slots.get('endDate')?.value,
    //       slotTiming: this.slotArray,
    //     },
    //   };
    //   this.app.updateSlot(data).subscribe((res11) => {
    //     if (res11['message'] == 'Updated Successfully') {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Successfully Updated',
    //       });
    //       setTimeout(() => {
    //         this.onBackPress();
    //       }, 2000);
    //     } else {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: res11['message'],
    //       });
    //     }
    //   });
    // } else {
      this.app.getInvoiceAndReg().subscribe((res)=>{
        this.change()
        // console.log(new Date());
        
          let data = {
           
            id:this.userId,
            slots:{
              invoiceNo:res['invoiceNo']+1,
              invoiceDate:new Date().toISOString(),
              startDate: this.slots.get('startDate')?.value,
              dueDate:this.slots.get('dueDate')?.value,
              paymentMode:this.slots.get('paymentMode')?.value,
              description:this.slots.get('description')?.value,
              amount: this.slots.get('amount')?.value,
              paidAmount: this.slots.get('paidAmount')?.value,
              dueAmount: this.slots.get('dueAmount')?.value,
              discount: this.slots.get('discount')?.value,
              enrollmentAmount: this.slots.get('enrollmentAmount')?.value,
              endDate: this.slots.get('endDate')?.value,
              slotTiming:this.slotArray,
              isActive:'ACTIVE'
            }
          }
          this.app.addSlot(data).subscribe((res11)=>{
            if(res11['message']=='Updated Successfully'){
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Updated',
                detail: 'Invoice No. :'+  res['invoiceNo']+1,
              });
              setTimeout(() => {
              this.onBackPress()
              }, 2000);
            }
            else{
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res['message'],
              });
            }
         
          })
        })
    // }
  }
}
