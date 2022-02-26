import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../service/app.service';
import domtoimage from 'dom-to-image';
import * as jspdf from 'jspdf';  
import { Location } from '@angular/common';

// import { DataService } from '../services/Data/Data.service';

@Component({
  selector: 'app-invoiceDetails',
  templateUrl: './invoiceDetails.component.html',
  styleUrls: ['./invoiceDetails.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  studentsDetails:any={}
  userid:any=''
  loading=false
  slotid:any=''
  constructor(private appService:AppService,private _Activatedroute:ActivatedRoute,private location:Location) { 
    this._Activatedroute.paramMap.subscribe(params => { 
      this.userid = params.get('userid'); 
      this.slotid = params.get('slotid'); 
  });
  }
  @ViewChild('invoice', {static: false}) invoice:ElementRef
  ngOnInit() {
    this.loading=true
    this.appService.getInvoice(this.userid,this.slotid).subscribe((res:any)=>{
      this.studentsDetails=res.user
      

      this.studentsDetails?.slots.forEach((ele,i) => {
        let timing = [];

          ele.slotTiming.forEach((element) => {
            let startTime = new Date(element.split('-')[0]);
            let endTime = new Date(element.split('-')[1]);
            timing.push(
              this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
            );
          });
        this.studentsDetails.slots[i].slotTiming = timing;

        });
     
this.loading=false
      console.log(res);  
    })
  }
  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  download(){
    domtoimage.toPng(this.invoice.nativeElement).then(
      (dataUrl) => 
     {
        //Initialize JSPDF
        const doc = new jspdf('p', 'mm', 'a4');
        doc.addImage(dataUrl, 'PNG', 0, 0, 210, 150);//change values to your preference
        // form.resetForm()
        doc.save('invoice.pdf');
        // this.invoiceHidden=true
        // this.addusershow=false
        // this.isrenew=false
    })  
  }
  onBackPress(){
    this.location.back();
  }
}
