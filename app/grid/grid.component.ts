import {Input, Component, EventEmitter, Output} from "@angular/core";
import * as _ from "lodash";

@Component({
    selector: 'marvell-grid',
    template: require("./grid.component.html"),
    styles: [require("./grid.component.css")],
})
export class GridComponent {
    @Input() columns: GridColumn[];
    @Input() rows: any[];
    @Input() showDeleteButton: boolean;
    @Input() showEditButton: boolean;
    @Input() showIconButton: boolean;

    @Output() editingRow: EventEmitter<any>;
    @Output() deletingRow: EventEmitter<any>;
    @Output() iconAction: EventEmitter<any>;

    sortedRows: any[];
    sortOrder: string;
    sortedColumn: GridColumn;

    constructor(){
        this.editingRow = new EventEmitter<any>();
        this.deletingRow = new EventEmitter<any>();
        this.iconAction=new EventEmitter<any>();
        this.sortedColumn = null;
        this.sortOrder = "asc";
    }

    ngOnChanges(){
        if(this.columns){
            if(this.columns.length) {
                this.sortedColumn = this.columns[0];
                this.sortOrder = "asc";
            }

            if(this.rows){
                this.sortedRows = this.runSort(this.rows);
            }
        }
    }

    private get hasActionsColumn(){
        return this.showDeleteButton || this.showEditButton;
    }
    private get hasIconColumn(){
        return this.showIconButton;
    }

    private toggleColumn(column: GridColumn){
        if(this.sortedColumn == column){
            this.sortOrder = (this.sortOrder=="asc" ? "desc" : "asc");
        }
        else {
            this.sortedColumn = column;
            this.sortOrder = "asc";
        }

        this.sortedRows = this.runSort(this.rows);
    }

    private runSort(rows){
        const res  = _.orderBy(this.rows, [this.sortedColumn.field], [this.sortOrder]);
        return res;
    }

    private getSortOrderChar(column: GridColumn){
        if(column == this.sortedColumn){
            return ""
        }
    }

    private onEdit(row: any){
        this.editingRow.emit(row);
    }

    private onIconPress(row: any){
        this.iconAction.emit(row);
    }
    private onDelete(row: any) {
        this.deletingRow.emit(row);
    }
}


export interface GridColumn {
    field: string;
    title: string;
}
