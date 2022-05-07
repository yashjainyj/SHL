import { Component, HostListener } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studyhome';
  isShow: boolean;
  topPosToStartShowing = 100;
  userDetails:any={}

  constructor(private app:AppService){
    if(localStorage.getItem('id')){
      this.getUser()
    }
  }
  getUser(){
    this.app.getuserDetail(localStorage.getItem('id')).subscribe(res=>{
      this.userDetails = res
      // console.log(this.userDetails);
      
    })
  } 
  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

   
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
      this.getUser()
    } else {
      this.isShow = false;
      this.getUser()

    }
  }
  whatsappurl: string = "https://wa.me/916263653486";
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
