import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { employeedata } from './employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  
  
  showadd!:boolean;
  showupdate!:boolean;
  employeemodelobj: employeedata =new employeedata
  formValue! :FormGroup;
  allemployeedata:any;
  constructor(private formBuilder: FormBuilder, private api:ApiService){}
  
  ngOnInit():void{
   this.formValue =this.formBuilder.group({
    
    name:['',Validators.required],
    city:['',Validators.required],
    email:['',Validators.required],
    company:['',Validators.required],
    salary:['',Validators.required],
   })

this.getdata()
  }
  

add(){
  this.showadd=true;
  this.showupdate=false;
}


edit(data:any){
  this.showadd=false;
  this.showupdate=true;
  this.employeemodelobj.id= data.id;

  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['city'].setValue(data.city)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['company'].setValue(data.company)
  this.formValue.controls['salary'].setValue(data.salary)
}

//post employee data
addemployee(){
  this.employeemodelobj.name =this.formValue.value.name;
  this.employeemodelobj.city=this.formValue.value.city;
  this.employeemodelobj.email=this.formValue.value.email;
  this.employeemodelobj.company=this.formValue.value.company;
  this.employeemodelobj.salary=this.formValue.value.salary;


this.api.postemployee(this.employeemodelobj).subscribe(res=>{
  console.log(res);
  this.formValue.reset();
  alert("Record added Sucessfully");
},
err=>{
  alert("Something Went Wrong")
}
)
}

//get employee data

getdata(){
  this.api.getemployee().subscribe(res=>{
    this.allemployeedata=res;
    alert("Record added Sucessfully")
    
  },
  err=>{
    alert("Something went wrong")
  }
  )
}
  
// delete data

deleteemployee(data:any){
  this.api.deleteemployee(data.id).subscribe(res=>{
    if(confirm('Are you sure to delete?'))
    alert("Record deleted Sucessfully");
    this.getdata()
  })
}

//update data

updateemployee(){
  this.employeemodelobj.name =this.formValue.value.name;
  this.employeemodelobj.city=this.formValue.value.city;
  this.employeemodelobj.email=this.formValue.value.email;
  this.employeemodelobj.company=this.formValue.value.company;
  this.employeemodelobj.salary=this.formValue.value.salary;


  this.api.updateemployee(this.employeemodelobj, this.employeemodelobj.id).subscribe(res=>{
    this.formValue.reset();
    this.getdata();
alert("record Update sucessfully")
  },
  err=>{
    alert("something went wrong")
  }
  )
}

}
