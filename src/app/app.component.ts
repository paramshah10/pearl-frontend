import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MessagesService } from './messages.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['From', 'Content', 'Date/Time'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private seekers$ = [];
  public messages$ = [];
  isLoadingResults = true

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.fetchMessages()
        .subscribe(data => {
          this.seekers$ = data.seekers
          this.getAllMessages()
          this.dataSource = new MatTableDataSource(this.messages$);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }

  getAllMessages() {
    this.seekers$.forEach((seeker) => {
      seeker.messages.forEach((message) => {
        message.from = seeker.firstName + ' ' + seeker.lastName
        this.messages$.push(message)
      })
    })

    this.filterMessages()
    this.isLoadingResults = false
  }

  filterMessages() {
    this.messages$ = this.messages$.filter((element) => {
      return element.direction == 0
    })
    this.fixDate()
  }

  fixDate() {
    this.messages$.forEach((_, index) => {
      this.messages$[index].dateCompleted = this.messages$[index].dateCompleted.slice(0, 10) + ', ' + this.messages$[index].dateCompleted.slice(11, 19)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
