import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  title: string = 'Listado de Clientes';
  
  users: User[] = [];

  date: any = 2024;
  info: number = 0;

  age: any = [];
  clients!: number;

  filtername: boolean = true;
  filterdate: boolean = false;
  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => {
        // Ordenar usuarios alfabéticamente por nombre
        this.users = users.sort((a, b) => a.name.localeCompare(b.name));

        const fecha:any = users
        
        for(const fechainfo of fecha){

          console.log( this.date - parseInt(fechainfo.dateofbirth) );
          
          this.age = fecha.dateofbirth;
          
        }

        const data =  users[0].dateofbirth
        const total = parseInt(data) 
        const total2 = this.date - total
        this.info = total2;
        console.log(this.info);
        


        this.clients = users.length;
  
        
        
        
    });
  }
  
  onDeleteUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);   
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        return age - 1;
    } else {
        return age;
    }
}

  filterData(filter:string): void{
    if (filter == 'name') {
      this.filtername = true;
      this.filterdate = false;
    }else{
      this.filtername = false;
      this.filterdate = true;
    }
  }

}
