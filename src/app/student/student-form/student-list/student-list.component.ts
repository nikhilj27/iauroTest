import { IStudent } from './../../../model/student.model';
import { HelperService } from './../../../service/helper.service';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() studentData: any = null;
  @Input() isEdit = false;
  @Output() sendData = new EventEmitter();
  @Output() isEditDone = new EventEmitter();
  studentList: any[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'city',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      this.studentList = this.helperService.getData() as Array<any>;
      this.dataSource = new MatTableDataSource(this.studentList);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    if (this.studentData !== null) {
      if (localStorage.getItem('data') != null) {
        this.studentList = this.helperService.getData() as Array<any>;
        const index = this.studentList.findIndex(
          (student) => student.Id === this.studentData?.Id
        );

        if (index !== -1) {
          this.studentList.splice(index, 1, this.studentData);
        } else {
          this.studentList.push(this.studentData);
        }
      } else {
        this.studentList.push(this.studentData);
      }
      this.helperService.setData(this.studentList);
      this.dataSource = new MatTableDataSource(this.studentList);
      this.dataSource.paginator = this.paginator;
    }
  }

  public updateStudent(studentData: any): void {
    this.sendData.emit(studentData);
  }

  public deleteStudent(studentData: any): void {
    if (this.studentList.length === 1) {
      this.studentList = [];
      localStorage.clear();
      this.dataSource = new MatTableDataSource(this.studentList);
      this.dataSource.paginator = this.paginator;
      return;
    } else {
      this.studentList.splice(studentData.Id, 1);
    }
    this.helperService.setData(this.studentList);
    this.dataSource = new MatTableDataSource(this.studentList);
    this.dataSource.paginator = this.paginator;
  }
}
