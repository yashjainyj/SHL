import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
// import { DataService } from '../services/Data/Data.service';
import domtoimage from 'dom-to-image';
import * as jspdf from 'jspdf';  
import { AppService } from '../service/app.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  @ViewChild('invoice', {static: false}) invoice:ElementRef
  lineStylesData: any;
  basicOptions: any;
  loading=true
  invoices:any=[]
  filteredInvoice=[]
  paidInvoices=[]
  dueInvoices=[]
  monthPaidInvoice=[]
  monthDueInvoice=[]
  // staffSalary
  heading = 'All Invoices'
  totalCollection=0
  monthCollection=0
  monthInvoices=[]
  showInvoice=false
  studentsDetails:any={}
  monthcollectionamount=[]
  totalFilterAmount=0
  totalpaidFilterAmount=0
  overAllInvoiceCount=0
  displayResponsive=false
  totaldueFilterAmount=0
  constructor(private dataService:AppService,public location :Location) { }
url = environment.url
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
  ngOnInit() {
 
    // this.loading=false
    this.dataService.getAll('','').subscribe((res:any)=>{


      this.loading=false
      this.totalCollection=0
      this.paidInvoices=[]
      this.dueInvoices=[]
      this.monthCollection=0
      this.monthcollectionamount=[0,0,0,0,0,0,0,0,0,0,0,0]
      this.monthDueInvoice=[]
      this.monthPaidInvoice=[]
      this.monthInvoices=[]
      this.totalFilterAmount=1
      this.overAllInvoiceCount=1
      this.totalpaidFilterAmount=1
      this.totaldueFilterAmount=1
      let date  = new Date();
      this.filteredInvoice = res.user
      this.invoices = res.user
      console.log(res);
      this.filteredInvoice.forEach((element1, index) => {

        element1.slots.forEach((ele,i) => {
        let timing = [];
        // console.log(ele.invoiceDate);
        let invoiceDate  = new Date(ele.invoiceDate);
          this.monthcollectionamount[invoiceDate.getMonth()] = this.monthcollectionamount[invoiceDate.getMonth()] + +ele['amount']
          // console.log(this.monthcollectionamount);
          this.overAllInvoiceCount = this.overAllInvoiceCount + 1
          if(ele['dueAmount']=='0' || ele['dueAmount']==0){
                  this.paidInvoices.push(element1)
        
                }
                else{
                  this.dueInvoices.push(element1)
                  this.totaldueFilterAmount= this.totaldueFilterAmount + +ele['dueAmount']
        
                }
                this.totalCollection = this.totalCollection + +ele['amount']
          ele.slotTiming.forEach((element) => {
            let startTime = new Date(element.split('-')[0]);
            let endTime = new Date(element.split('-')[1]);
            timing.push(
              this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
            );
          });
        this.filteredInvoice[index].slots[i].slotTiming = timing;

        });
        this.lineStylesData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'],
          datasets: [
              {
                  label: 'Collection',
                  data: this.monthcollectionamount,
                  fill: true,
                  borderColor: 'sandybrown',
                  tension: .4,
                  backgroundColor: 'rgba(255,167,38,0.4)'
              }
          ]
      };
      this.basicOptions={ 
        scales: {
          y: {
            ticks: {
              color: 'white'
            }
          },
          x:{
            ticks:{
              color:'white'
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  color: 'white'
              }
          }
      },
      }  
      });
   
      this.statuses = [
        {label: 'Active', value: 'ACTIVE'},
        {label: 'IN-Active', value: 'IN-ACTIVE'},
        
    ]
    //   // console.log(date.getFullYear());
    //   this.totalCollection =  res.reduce((initial, name) => {
    //     name['date'] = new Date(name['date']);
    //     if(name['date'].getMonth()==date.getMonth() && name['date'].getFullYear()==date.getFullYear()){
    //       this.monthInvoices.push(name)
    //       this.monthCollection = this.monthCollection + +name['amount']
    //       if(name['due']=='0' || name['due']==0){
    //         this.monthPaidInvoice.push(name)
    //       }
    //       else{
    //         this.monthDueInvoice.push(name)
    //       }
    //     }
    //     if(name['due']=='0' || name['due']==0){
    //       this.paidInvoices.push(name)

    //     }
    //     else{
    //       this.dueInvoices.push(name)
    //       this.totaldueFilterAmount= this.totaldueFilterAmount + +name['due']

    //     }
    //     this.totalpaidFilterAmount= this.totalpaidFilterAmount + +name['paid']
    //     initial = initial+ +name['amount']
    //     // console.log(initial+'->'+name['amount']);
        
      
    //       this.monthcollectionamount[name['date'].getMonth()] = this.monthcollectionamount[name['date'].getMonth()] + +name['amount']
    //       // console.log(this.monthcollectionamount);
      
    //     return initial;

        
        
    //   },0);
    //   // console.log(res);
    //   this.lineStylesData = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'],
    //     datasets: [
    //         {
    //             label: 'Collection',
    //             data: this.monthcollectionamount,
    //             fill: true,
    //             borderColor: 'sandybrown',
    //             tension: .4,
    //             backgroundColor: 'rgba(255,167,38,0.4)'
    //         }
    //     ]
    // };
    // this.basicOptions={ 
    //   scales: {
    //     y: {
    //       ticks: {
    //         color: 'white'
    //       }
    //     },
    //     x:{
    //       ticks:{
    //         color:'white'
    //       }
    //     }
    //   },
    //   plugins: {
    //     legend: {
    //         labels: {
    //             color: 'white'
    //         }
    //     }
    // },
    // }

    //   console.log(this.paidInvoices);
    //   this.filteredInvoice=res
    //   this.invoices=res
    //   this.totalFilterAmount=this.totalCollection
    })
    
  }
  statuses: any[];
  filter(purpose){
      switch (purpose) {
        case 'All': this.filteredInvoice = this.invoices
          this.heading = 'All Invoices'
          break;
        case 'Paid': this.filteredInvoice = this.paidInvoices
        this.heading = "Paid Invoices"
        break
        case 'Due' : this.filteredInvoice = this.dueInvoices
        this.heading = "Due Invoices"

        break;
        case 'monthPaid': this.filteredInvoice = this.monthPaidInvoice
        this.heading = "Month Paid Invoices"

        break;
        case 'MonthDue':this.filteredInvoice =this.monthDueInvoice
        this.heading =  " Month Due Invoices"
        break
        case 'monthAll':this.filteredInvoice = this.monthInvoices
        this.heading = 'Month All Invoices'
        break; 
        default:
          break;
      }
      this.totalFilterAmount=0
  this.totalpaidFilterAmount=0
  this.totaldueFilterAmount=0
  this.filteredInvoice.forEach((res)=>{
    this.totalFilterAmount=   this.totalFilterAmount+ +res['amount']
  this.totalpaidFilterAmount = this.totalpaidFilterAmount + +res['paid']
  this.totaldueFilterAmount = this.totaldueFilterAmount + +res['due']
    })

  }
  clear(table: Table) {
    table.clear();
}
selectedInvoice(data){
  this.studentsDetails = data
  // console.log(this.studentsDetails);
  
  this.showInvoice=true
}
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
