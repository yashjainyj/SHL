import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { AppService } from '../service/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  list: any = [];
  limit = 10;
  loading = false;
  detailsVisibile=false
  selectedSlots=[]
  search=''
  url=environment.url
  studentsData: any = [];
  constructor(private app: AppService,private router:Router,private messageService:MessageService) {}
  sliderArray = new Array(3);
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
    
    this.sliderArray = ['Slots Detials', 'Payment Details', 'Personal Details'];
    this.getAllstudent(1, 'all');
    console.log(new Date());
  }
  selectedUserId=''
  selectUser(student,userId){
    console.log(student);
    this.selectedUserId = userId
    this.detailsVisibile=true
    
 

    this.selectedSlots = student
  }
  getAllstudent(page, purpose) {
    this.loading = true;
    if (purpose == 'all') {
      this.app.getAllStudents(page, this.limit).subscribe((res) => {
        this.studentsData = res['user'];
        // console.log(res);
        this.studentsData['docs'].forEach((element1, index) => {

          element1.slots.forEach((ele,i) => {
          let timing = [];
            
            ele.slotTiming.forEach((element) => {

              let startTime = new Date(element.split('-')[0]);
              let endTime = new Date(element.split('-')[1]);
              
              if(!element.includes('AM')&&!element.includes('PM')){
               
                timing.push(
                  this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
                );
              }
              else{
                timing.push(
                element
                );
              }
              
            });
          this.studentsData['docs'][index].slots[i].slotTiming = timing;

          });
       
        });

        // console.log(this.studentsData);
        this.list = [
          { icon: '', title: 'Total Members', count: '', selected: true },
          { icon: '', title: 'Live Members', count: 2, selected: false },
          { icon: '', title: 'Expire Members', count: 3, selected: false },
          { icon: '', title: 'Expiring(1-3)', count: 4, selected: false },
          // {icon:'',title:'Expiring(4-7)',count:'2'},
          // {icon:'',title:'Expiring(8-15)',count:'3'},
          // {icon:'',title:'Total Collection',count:this.totalAmount},
          // {icon:'',title:'Total Expense',count:'10'},
          { icon: '', title: 'Due Amount', count: 4, selected: false },
          { icon: '', title: 'Birthday', count: 6, selected: false },
        ];
        this.selectedIndexBorder(0, this.studentsData?.totalDocs);
      });
    } else if (purpose == 'birthday') {
      this.app.getBirthdayStudents(page, this.limit).subscribe((res) => {
        this.studentsData = res['user'];
        // console.log(res);
        this.studentsData['docs'].forEach((element1, index) => {
          element1.slots.forEach((ele,i) => {
            let timing = [];
  
              ele.slotTiming.forEach((element) => {
                let startTime = new Date(element.split('-')[0]);
                let endTime = new Date(element.split('-')[1]);
                timing.push(
                  this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
                );
              });
            this.studentsData['docs'][index].slots[i].slotTiming = timing;
  
            });
        });

        this.selectedIndexBorder(5, this.studentsData?.totalDocs);
      });
    } else if (purpose == 'dueAmount') {
      this.app.getDueUser(page, this.limit).subscribe((res:any) => {
        // this.studentsData = res['user'];
        this.studentsData=res['user']
        let docs=[]
        let count =0
        // this.studentsData['docs']=[]
        console.log(res);
        res['user'].docs.forEach((element1, index) => {
        
            element1.slots.forEach((ele,i) => {
              let timing = [];
    
                ele.slotTiming.forEach((element) => {
                  let startTime = new Date(element.split('-')[0]);
                  let endTime = new Date(element.split('-')[1]);
                  if(element1.slots[0].dueAmount!=0 && i==0 && index==0){
                    docs.push(element1)
                    count++
                  }
                  timing.push(
                    this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
                  
                  );
                });
              this.studentsData['docs'][index].slots[i].slotTiming = timing;
    
              });
          
        
        });
        this.studentsData['docs']=docs
        this.studentsData['totalDocs']=count

        this.selectedIndexBorder(4, this.studentsData?.totalDocs);
      });
    } else if (purpose == 'ExpireIn3Days') {
      this.app.getExpireIn3Days(page, this.limit).subscribe((res) => {
        this.studentsData = res['user'];
        console.log(res);
        this.studentsData['docs'].forEach((element1, index) => {
          element1.slots.forEach((ele,i) => {
            let timing = [];
  
              ele.slotTiming.forEach((element) => {
                let startTime = new Date(element.split('-')[0]);
                let endTime = new Date(element.split('-')[1]);
                timing.push(
                  this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
                );
              });
            this.studentsData['docs'][index].slots[i].slotTiming = timing;
  
            });
        });

        this.selectedIndexBorder(3, this.studentsData?.totalDocs);
      });
    } else if (purpose == 'getExpire') {
      this.app.getExpire(page, this.limit).subscribe((res) => {
        this.studentsData = res['user'];
        console.log(res);
        this.studentsData['docs'].forEach((element1, index) => {
          element1.slots.forEach((ele,i) => {
            let timing = [];
  
              ele.slotTiming.forEach((element) => {
                let startTime = new Date(element.split('-')[0]);
                let endTime = new Date(element.split('-')[1]);
                timing.push(
                  this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
                );
              });
            this.studentsData['docs'][index].slots[i].slotTiming = timing;
  
            });
        });

        this.selectedIndexBorder(2, this.studentsData?.totalDocs);
      });
    } else if (purpose == 'getActive') {
      // this.app.getActive(page, this.limit).subscribe((res) => {
      //   this.studentsData = res['user'];
      //   console.log(res);
      //   this.studentsData['docs'].forEach((element1, index) => {
      //     element1.slots.forEach((ele,i) => {
      //       let timing = [];
  
      //         ele.slotTiming.forEach((element) => {
      //           let startTime = new Date(element.split('-')[0]);
      //           let endTime = new Date(element.split('-')[1]);
      //           timing.push(
      //             this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
      //           );
      //         });
      //       this.studentsData['docs'][index].slots[i].slotTiming = timing;
  
      //       });
      //   });

      //   this.selectedIndexBorder(1, this.studentsData?.totalDocs);
      // });
    }
  }
  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page limit 
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event);
    this.getAllstudent(this.studentsData?.nextPage, 'all');
    
    // this.getAllstudent(event.first, 'all');

}
  nextPage() {
    this.getAllstudent(this.studentsData?.nextPage, 'all');
  }
  previousPage() {
    this.getAllstudent(this.studentsData?.prevPage, 'all');
  }
  limitChange() {
    // console.log(this.limit);
    this.getAllstudent(1, 'all');
  }
  logout() {
    localStorage.clear();
    this.messageService.add({severity:'success', summary: 'Logout Successfully', detail: ''});
    // this.userDetails={}
    this.router.navigate(['login'])
  }
  selectedIndexBorder(index, count) {
    this.list.forEach((element) => {
      element.selected = false;
      element.count = 'click here';
    });
    this.list[index].selected = true;
    this.list[index].count = count;
    this.loading = false;
  }
  filter(index) {
    var name = this.list[index].title;
    this.selectedIndexBorder(index, this.studentsData.totalDocs);

    switch (name) {
      case 'Total Members':
        this.getAllstudent(1, 'all');
        // this.filterData = this.list1
        break;
      case 'Live Members':
        // this.getAllstudent(1, 'getActive');

        // this.filterData = this.liveMember
        this.router.navigate(['/live-seat'])
        break;
      case 'Expire Members':
        // this.filterData = this.expireMember
        this.getAllstudent(1, 'getExpire');

        break;
      case 'Expiring(1-3)':
        // this.filterData = this.expiring3
        this.getAllstudent(1, 'ExpireIn3Days');

        break;
      case 'Due Amount':
        // this.filterData = this.DueMemberList
        this.getAllstudent(1, 'dueAmount');
        break;
      case 'Birthday':
        this.getAllstudent(1, 'birthday');

        // this.filterData = this.birthdayList
        break;
      default:
        break;
    }
  }
}
