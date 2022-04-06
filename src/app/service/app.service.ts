import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
url =''
constructor(private http:HttpClient) { 
  this.url = environment.url
}
getAllStudents(page,limit){
  return this.http.get(this.url+`user?page=${page}&limit=${limit}`)
}
getAll(page,limit){
  return this.http.get(this.url+`user`)
}
getStaff(){
  return this.http.get(this.url+`user/getStaff`)
}
addStaff(data){
  return this.http.post(this.url+'user/addStaff',data)

}
getBirthdayStudents(page,limit){
  return this.http.get(this.url+`user/getbirthdayuser?page=${page}&limit=${limit}`)
}

getDueUser(page,limit){
  return this.http.get(this.url+`user/getDueUser?page=${page}&limit=${limit}`)
}
getExpireIn3Days(page,limit){
  return this.http.get(this.url+`user/getExpireIn3Days?page=${page}&limit=${limit}`)
}
getExpire(page,limit){
  return this.http.get(this.url+`user/getExpire?page=${page}&limit=${limit}`)
}
getActive(page,limit){
  return this.http.get(this.url+`user/getactiveslot?page=${page}&limit=${limit}`)
}
addUser(data){
  return this.http.post(this.url+'user/add',data)
}
editUser(data){
  return this.http.post(this.url+'user/updateUser',data)
}
updateSlot(data){
  return this.http.post(this.url+'user/updateslot',data)
}
updateStaff(data){
  return this.http.post(this.url+'user/updateStaff',data)
}
addSlot(data){
  return this.http.post(this.url+'user/addSlot',data)
}
uploadImage(data){
  return this.http.post(this.url+'user/addImage',data)
}
updateImage(data){
  return this.http.post(this.url+'user/updateImage',data)
}
getInvoiceAndReg(){
  return this.http.get(this.url+'user/getInvoiceAndReg')
}
getsingleSlot(id){
  let data = {
    id : id
  }
  return this.http.post(this.url+'user/getsingleSlot',data)
}
getuserDetail(id){
  let data = {
    id : id
  }
  return this.http.post(this.url+'user/getsingleuser',data)
}
getInvoice(userid,slotid){
  let data = {
    userId : userid,
    slotId:slotid
  }
  return this.http.post(this.url+'user/getInvoice',data)
}
getFacilities(){
  return this.http.get(this.url+'facilities')
}
updateFacilities(data){
  return this.http.post(this.url+'facilities/update',data)  

  
}
addFacilities(data){
  return this.http.post(this.url+'facilities/add',data)  

}
deleteFacilities(data){
  return this.http.post(this.url+'facilities/remove',data)  

}
bulkAdd(data){
  return this.http.post(this.url+'user/bulkAdd',data)  

}
// pi pi-clock	Open 24*7
getAbout(){
  return this.http.get(this.url+'about')
}
deleteAbout(data){
  return this.http.post(this.url+'about/remove',data)  

}
updateAbout(data){
  return this.http.post(this.url+'about/update',data)  

}
addAbout(data){
  return this.http.post(this.url+'about/add',data)  

}
deleteStaff(data){
  return this.http.post(this.url+'user/deleteStaff',data)

}
getGallery(){
  return this.http.get(this.url+'gallery')  
}

deleteImageGallery(data){
  return this.http.post(this.url+'gallery/remove',data)  
}

addImageGallery(data){
  return this.http.post(this.url+'gallery/add',data)  
}



}
