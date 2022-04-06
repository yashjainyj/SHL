import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
// import { AuthServiceService } from '../auth/AuthService.service';
// import { DataService } from '../services/Data/Data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-live-seat',
  templateUrl: './live-seat.component.html',
  styleUrls: ['./live-seat.component.scss'],
})
export class LiveSeatComponent implements OnInit {
  UserDetails:any={}
  role:any;
  minDate :any
  count=0;
  seat= []
  studentsDetail=[]
  displayDetails=false
  activeStudents=[]
  loading1;
  selecteditem:any={}
  studentsData
  sliderArray
  constructor(private app:AppService,private location:Location) {
    this.sliderArray = ['Slots Detials', 'Payment Details', 'Personal Details'];
    
    this.role = localStorage.getItem('role')
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

dosomething(){
  this.loading1=false
}
selectedSeat(i){
  if(i<this.count)
  this.displayDetails=true
  
  this.selecteditem = this.studentsDetail[i]
  // console.log(this.studentsDetail);

}
selectedUserId
detailsVisibile
selectedSlots
selectUser(student,userId){
  console.log(student);
  this.selectedUserId = userId
  this.detailsVisibile=true
  


  this.selectedSlots = student
}
onBackPress(){
  this.location.back();
}

 getMinutes(str) {
  var time = str.split(':');
  return time[0]*60+time[1]*1;
}
 getMinutesNow() {
  var timeNow = new Date();
  return timeNow.getHours()*60+timeNow.getMinutes();
}
  ngOnInit() {
    this.seat=[]
    this.count=0
    this.studentsDetail=[]
    this.minDate = new Date();
    this.app.getActive(1, 160 ).subscribe((res) => {
      this.studentsData = res['user'];
      console.log(this.studentsData);
      
      this.studentsData['docs'].forEach((element1, index) => {
        element1.slots.forEach((ele,i) => {
          let timing = [];
           
            ele.slotTiming.forEach((element) => {
              let startTime = new Date(element.split('-')[0]);
              let endTime = new Date(element.split('-')[1]);

              var  currentDate = new Date()   

                       var startDate = new Date(currentDate.getTime());
                        startDate.setHours(+startTime.getHours());
                        startDate.setMinutes(+startTime.getMinutes());
                        startDate.setSeconds(+startTime.getSeconds());
          
                       var endDate = new Date(currentDate.getTime());
                        endDate.setHours(+endTime.getHours());
                        endDate.setMinutes(+endTime.getMinutes());
                        endDate.setSeconds(+endTime.getSeconds());
          
                        if(startDate < currentDate && endDate > currentDate){
                          
                        if(ele.isActive=='ACTIVE'){
                          this.count++
                          this.studentsDetail.push(element1)
                            console.log('hi');
                        }
                        
                          
                        }

         
              
              timing.push(
                this.formatAMPM(startTime) + '-' + this.formatAMPM(endTime)
              );
            });
          this.studentsData['docs'][index].slots[i].slotTiming = timing;
        
          });
      });
     
      for (let index = 0; index < this.count; index++) {
       this.seat[index].isbooked=true
      }
    });
      for (let index = 1; index <= 160; index++) {
      let d={
        seat_number:index,
        isbooked:false,
      }
     this.seat.push(d)
    }
  
  }

}
