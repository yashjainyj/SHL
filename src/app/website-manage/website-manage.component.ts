import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-website-manage',
  templateUrl: './website-manage.component.html',
  styleUrls: ['./website-manage.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class WebsiteManageComponent implements OnInit {
  @ViewChild('background') background:ElementRef
  Facilities:any=[]
  Aboutus:any=[]
  images:any=[]
  tempImages:any={}
  facility:any={icon:'pi ',name:null}
  fileToUpload: File | null = null;
  showEditAboutDialog=false
  editAbout=false
  loading1=true
  about:any={status:null,icon:'pi ',color:null,text:null}
  loading=true
  showFacilities=false
  showAbout=false
  showImages=false
  scrHeight:any;
  scrWidth:any;
  col=60
  url = environment.url
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        // console.log(this.scrHeight, this.scrWidth);
        if(this.scrWidth<650){
          this.col=25

        }
        else{
          this.col=60

        }
  }

  constructor(private location:Location,private dataService:AppService,private confirmationService: ConfirmationService,private messageService:MessageService) { }

  ngOnInit() {
    this.loading=false
    this.getScreenSize()
    this.dataService.getFacilities().subscribe(res=>{
      this.Facilities = res['Facilities']
    })
  }
  dosomething()
  {
    this.loading1=false
  }
  viewChange(purpose){
    this.loading=true
    if(purpose=='hideFac')
    {
      this.showFacilities=false
      this.showAbout=false
      this.showImages=false
      this.loading=false
      this.background.nativeElement.style.height='100vh'
    }
    else if(purpose=='showFac'){
      this.dataService.getFacilities().subscribe(res=>{
        this.Facilities = res
        this.loading=false
      })
      this.showImages=false
      this.showFacilities=true
      this.showAbout=false
      this.background.nativeElement.style.height='max-content'
    }
    else if(purpose=='hideAbout'){
      this.showAbout=false
      this.loading=false
      this.showImages=false
      this.showFacilities=false
      this.background.nativeElement.style.height='100vh'
    }
    else if(purpose=='showAbout'){
      // this.dataService.getAboutUs().subscribe((res:any)=>{
      //   res.push({'status':'New',icon:'pi pi-plus'})
      //   this.Aboutus = res
      //   console.log(res);
        
      //   this.loading=false
      // })
      // this.showFacilities=false
      // this.showImages=false
      // this.showAbout=true
      // if(this.scrWidth<650)
      // this.background.nativeElement.style.height='100vh'
      // else
      // this.background.nativeElement.style.height='100vh'
    }
    else if(purpose=='hideImages'){
      this.showFacilities=false
      this.showAbout=false
      this.loading=false
      this.showImages=false
      this.background.nativeElement.style.height='100vh'
    }
    else if(purpose=='showImages'){
    //   this.dataService.getImages().subscribe((res:any  )=>{
    //     console.log(res);
        
    //     let data1=[]
    //     // console.log(res.data());
    //     this.tempImages = res[0]
    //     Object.values(res[0]).forEach(element => {
    //      let d = {
    //        previewImageSrc: element
    //      }
    //     data1.push(d)
    //   });
    //   console.log(data1);
      
    //  this.images = data1
    //  this.loading=false
    //  })
    //   this.showFacilities=false
    //   this.showAbout=false
    //   this.showImages=true
    //   this.background.nativeElement.style.height='max-content'

    }

  }
  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    let fd = new FormData()
    this.fileToUpload=files.item(0)
    // fd.append('id',this.userId)
    fd.append('image[]',this.fileToUpload,this.fileToUpload.name)
   this.dataService.addImageGallery(fd).subscribe((res:any)=>{
           this.messageService.add({
            severity: 'success',
            summary: 'Pic Updated',
            // detail: 'Reg No. :'+  res['regNo']+1,
          });
          this.dataService.getGallery().subscribe(res=>{
            this.images = res['gallery']
            
          })
      // console.log(res);
      // this.uploadedPath=res.image
          // window.location.reload()
    //    this.addUser.patchValue({
    //     image:res.image
    // }) 
    })

    
}
downloadURL
onUpload(event){
  
  
}
  confirm(product,ri) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            
            this.dataService.deleteFacilities(product).subscribe(res=>{
        this.messageService.add({severity:'success', summary: 'Deleted', detail:'Deleted Successfully!'});

            })
        }
    });
  }
  onBackPress(){
    this.location.back();
  }
  confirmImageDelete(product) {
    // console.log(product.previewImageSrc);
    // console.log(this.tempImages);
    // console.log(Object.keys(this.tempImages).find(key => this.tempImages[key] === product.previewImageSrc));

    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          
          console.log(product);
          
          this.dataService.deleteImageGallery(product).subscribe(res=>{
            if(res['message']=='Deleted Successfully'){
              this.messageService.add({severity:'success', summary: 'Success', detail:'Image is deleted'});
              this.dataService.getGallery().subscribe(res=>{
                this.images = res['gallery']
                
              })
            }
            
          })
    // delete this.tempImages[Object.keys(this.tempImages).find(key => this.tempImages[key] === product.previewImageSrc)]; 
    // console.log(this.tempImages);
          //   this.dataService.deleteImage(this.tempImages,product.previewImageSrc).subscribe(res=>{

          //   })
        }
    });
  }
  // clonedProducts
  onRowEditInit(product: any,purpose:any) {
    if(purpose=='facility'){
      // this.showEditAboutDialog=true
      // this.about=product
      // this.editAbout=true
    }else{
      this.showEditAboutDialog=true
      this.about=product
      this.editAbout=true
    }
 
    // this.clonedProducts[product.id] = {...product};
}
onRowEditSave(product: any,purpose) {
    if (purpose=='save') {
        // this.dataService.setFacilities(this.facility).subscribe(res=>{
        //   this.messageService.add({severity:'success', summary: 'Success', detail:'Facilities is added'});
        // })
        // console.log(this.facility);
        this.dataService.addFacilities(this.facility).subscribe(res=>{
          this.messageService.add({severity:'success', summary: 'Success', detail:'Facilities is Added'});
        })
    }  
    else {
      // this.dataService.updateFacilities(product).subscribe(res=>{
      //   this.messageService.add({severity:'success', summary: 'Success', detail:'Facilities is Updated'});
      // })
      this.dataService.updateFacilities(product).subscribe(res=>{
        this.messageService.add({severity:'success', summary: 'Success', detail:'Facilities is Updated'});
      })
      // console.log(product);
    }
}
onRowEditCancel(product: any, index: number) {
}
save(){
  // console.log(this.about);
  if(!this.editAbout)
  {
    this.dataService.addAbout(this.about).subscribe(res=>{
      this.showEditAboutDialog=false
       this.dataService.getAbout().subscribe(res=>{
          this.Aboutus = res['AboutUs']
          this.Aboutus.push({'status':'New',icon:'pi pi-plus'})
        })
      this.messageService.add({severity:'success', summary: 'Success', detail:'Data is added'});
    })
  }
  else{
    this.dataService.updateAbout(this.about).subscribe(res=>{
      this.showEditAboutDialog=false
      this.dataService.getAbout().subscribe(res=>{
        this.Aboutus = res['AboutUs']
        this.Aboutus.push({'status':'New',icon:'pi pi-plus'})
      })
      this.messageService.add({severity:'success', summary: 'Success', detail:'Data is Updated'});
    })
  }
}
confirmDeleteAbout(product) {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.dataService.deleteAbout(product).subscribe(res=>{
          this.dataService.getAbout().subscribe(res=>{
            this.Aboutus = res['AboutUs']
            this.Aboutus.push({'status':'New',icon:'pi pi-plus'})
          })
      this.messageService.add({severity:'success', summary: 'Deleted', detail:'Deleted Successfully!'});
          
        })
      //     this.dataService.deleteAbout(product).subscribe(res=>{

      //     })
      }
  });
}
handleChange(event){
  // console.log(event.index,this.Aboutus.length);
  
  if((event.index+1)==this.Aboutus.length)
  {
    this.showEditAboutDialog=true 
    this.about={status:null,icon:'pi ',color:null,text:null}
    this.editAbout=false

  }
}
tabChange(event){
    console.log(event.index);
    switch (event.index) {
      case 0:
        this.dataService.getFacilities().subscribe(res=>{
          this.Facilities = res['Facilities']
        })
        break;
      case 1:
        this.dataService.getAbout().subscribe(res=>{
          this.Aboutus = res['AboutUs']
          this.Aboutus.push({'status':'New',icon:'pi pi-plus'})
        })
        break;
        case 2:
          this.dataService.getGallery().subscribe(res=>{
            this.images = res['gallery']
            
          })
          break;
      default:
        break;
    }
    
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

displayBasic2: boolean;



}
