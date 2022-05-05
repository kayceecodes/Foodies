using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Foodies_api.Migrations
{
    public partial class BusinessModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Restaurants_RestaurantId",
                table: "Branches");

            migrationBuilder.DropIndex(
                name: "IX_Branches_RestaurantId",
                table: "Branches");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Branches",
                newName: "StreetAddress");

            migrationBuilder.AlterColumn<string>(
                name: "RestaurantId",
                table: "Branches",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId1",
                table: "Branches",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Branches",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Zipcode",
                table: "Branches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Branches_RestaurantId1",
                table: "Branches",
                column: "RestaurantId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Restaurants_RestaurantId1",
                table: "Branches",
                column: "RestaurantId1",
                principalTable: "Restaurants",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Restaurants_RestaurantId1",
                table: "Branches");

            migrationBuilder.DropIndex(
                name: "IX_Branches_RestaurantId1",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "RestaurantId1",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Zipcode",
                table: "Branches");

            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "Branches",
                newName: "Address");

            migrationBuilder.AlterColumn<int>(
                name: "RestaurantId",
                table: "Branches",
                type: "integer",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_RestaurantId",
                table: "Branches",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Restaurants_RestaurantId",
                table: "Branches",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id");
        }
    }
}
