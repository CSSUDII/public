import { Request, Response } from "express";
import { Client } from "../../client/Client";
import { BaseRouter } from "../../express/BaseRouter";
import ClassRouter from "../../express/ClassRouter";
import { Get } from "../../express/handlers";

@ClassRouter("/")
export class IndexRouter extends BaseRouter {
    constructor(client: Client) {
        super(client);
    }

    @Get("")
    public get(_req: Request, res: Response): void {
        res.send(`
            <script>
            function createTable(tableData) {
                const table = document.createElement("table");
                const tableBody = document.createElement("tbody");
        
                tableData.forEach(function (rowData) {
                    const row = document.createElement("tr");
        
                    rowData.forEach(function (cellData) {
                        const cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(cellData));
                        row.appendChild(cell);
                    });
        
                    tableBody.appendChild(row);
                });
        
                table.appendChild(tableBody);
                document.body.appendChild(table);
            }

            createTable(${this.client.server.info})
            </script>
        `);
    }
}
